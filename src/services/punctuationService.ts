import openai from "../config/openaiConfig";

async function punctuateTextLineByLine(text: string[]): Promise<string[]> {
    const results: string[] = [];

    for (const line of text) {
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a English Language Professor. You correct wrong punctuations and apply the punctuations in its right position" },
                    { role: "user", content: `Correct the punctuation of the following text:\n\n${line}` }
                ],
                n: 1,
                stop: null,
                temperature: 0.5
            });

            const processedLine = response.choices?.[0]?.message?.content?.trim();
            if (processedLine) {
                results.push(processedLine)
            } else {
                console.log("Invalid response format:", response);
                results.push(line);
            }
        } catch (error) {
            console.error("Error:", error);
            results.push(line);
        }
    }
    return results;
}

export default punctuateTextLineByLine;