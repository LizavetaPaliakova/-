
import { GoogleGenAI, Type } from "@google/genai";

export async function evaluateAnswer(task: string, userAnswer: string, mentorName: string): Promise<{
  success: boolean;
  feedback: string;
}> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Ты - ${mentorName}, наставник в приложении "Нейроквест". 
        Тебе нужно оценить выполнение практического задания. 
        Задание: ${task}
        Ответ пользователя: ${userAnswer}
        
        Оцени ответ пользователя.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            success: {
              type: Type.BOOLEAN,
              description: 'прав ли пользователь в своем подходе',
            },
            feedback: {
              type: Type.STRING,
              description: 'твой комментарий как наставника, подбадривающий, в стиле твоего персонажа',
            },
          },
          required: ['success', 'feedback'],
        },
      }
    });

    const result = JSON.parse(response.text?.trim() || '{}');
    return {
      success: result.success ?? true,
      feedback: result.feedback ?? "Отличная работа! Двигаемся дальше."
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      success: true, 
      feedback: "Твой запрос выглядит интересно! Я принимаю это решение. Вперед!"
    };
  }
}

export async function generateCharacterAvatar(prompt: string): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
}
