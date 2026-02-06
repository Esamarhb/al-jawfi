export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://your-domain.vercel.app",
        "X-Title": "Sahl Phone Chat"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "أنت مساعد ذكي عربي تجيب باحتراف وبأسلوب واضح." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "لم يتم الحصول على رد."
    });

  } catch (error) {
    res.status(500).json({ reply: "خطأ في الاتصال بالسيرفر." });
  }
}
