import { NextResponse } from 'next/server';
import OpenAI from 'openai';



// Example usage (uncomment to use):
// const imageBase64FromPublic = getBase64FromPublic('cv.png');
// console.log(imageBase64FromPublic);

export async function POST(req) {
  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
    }
    // --- Old Gemma model code uncommented ---
    const client = new OpenAI({
      baseURL: 'https://api.studio.nebius.com/v1/',
      apiKey: process.env.NEXT_PUBLIC_NEBIUS_GEMMA_API_KEY,
    });
    const systemPrompt = `You are a professional CV parser.\n\nExtract all available structured information from this resume image.\n\nRespond with ONLY the following JSON object, with NO extra text, NO markdown, and NO comments.\nIf any information is missing, leave the field blank.\n\n{\n  personal: {\n    name: string,\n    email: string,\n    phone: string,\n    address: string\n  },\n  summary: string,\n  experience: [\n    {\n      jobTitle: string,\n      company: string,\n      startDate: string,\n      endDate: string,\n      description: string\n    }\n  ],\n  education: [\n    {\n      degree: string,\n      institution: string,\n      startDate: string,\n      endDate: string\n    }\n  ],\n  skills: [string]\n}\n\nOnly extract what is clearly visible. Do not hallucinate or make up data. Preserve original phrasing and formatting where possible.`;
    const result = await client.chat.completions.create({
      model: "google/gemma-3-27b-it",
      max_tokens: 8192,
      temperature: 0.5,
      top_p: 0.9,
      extra_body: { top_k: 50 },
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Extract all information as per the instructions" },
            { type: "image_url", image_url: { url: imageBase64 } },
          ],
        },
      ],
    });
    /*
    // --- New Qwen/QVQ-72B-preview model code commented out ---
    const client = new OpenAI({
      baseURL: 'https://api.studio.nebius.com/v1/',
      apiKey: process.env.NEBIUS_API_KEY,
    });
    const systemPrompt = `You are a professional CV parser.\n\nDo not add any keys other than the ones explicitly listed in the JSON structure below. If a field is missing or not visible, leave it blank. Do not infer or assume information. Only extract what is clearly visible.\n\nRespond with ONLY the following JSON object, with NO extra text, NO markdown, and NO comments.\n\n{\n  \"personal\": {\n    \"name\": \"\",\n    \"email\": \"\",\n    \"phone\": \"\",\n    \"address\": \"\"\n  },\n  \"summary\": \"\",\n  \"experience\": [\n    {\n      \"jobTitle\": \"\",\n      \"company\": \"\",\n      \"startDate\": \"\",\n      \"endDate\": \"\",\n      \"description\": \"\"\n    }\n  ],\n  \"education\": [\n    {\n      \"degree\": \"\",\n      \"institution\": \"\",\n      \"startDate\": \"\",\n      \"endDate\": \"\"\n    }\n  ],\n  \"skills\": [\"\"]\n}\n\nExample input (base64 image):\n{\n  \"type\": \"image_url\",\n  \"image_url\": { \"url\": \"data:image/png;base64,iVBORw0KGgoAAAA"`
                    }
                }
            ]
        },
        {
            "role": "assistant",
            "content": [
                {
                    "type": "text",
                    "text": "{\n  \"personal\": {\n    \"name\": \"KRISHNA KAMALAKAR PAIKINE\",\n    \"email\": \"\",\n    \"phone\": \"\",\n    \"address\": \"\"\n  },\n  \"summary\": \"\",\n  \"experience\": [\n    {\n      \"jobTitle\": \"Software Developer Intern\",\n      \"company\": \"CLOUD COUNSELAGE\",\n      \"startDate\": \"May'24\",\n      \"endDate\": \"June'24\",\n      \"description\": \"• Collaborated with the design team to implement responsive UI/UX designs, ensuring compatibility across various devices and browsers\\n• Utilized Git for version control to collaborate with team through GitHub, maintaining codebase integrity and fostering efficient teamwork\\n• Engaged in continuous learning and improvement, exploring new technologies to enhance development and programming skills\\n• Optimized backend services using Express.js reducing response times and implemented database schemas in MongoDB Database\"\n    }\n  ],\n  \"education\": [\n    {\n      \"degree\": \"B.TECH\",\n      \"institution\": \"IIT Kharagpur\",\n      \"startDate\": \"\",\n      \"endDate\": \"2026\"\n    },\n    {\n      \"degree\": \"HSC\",\n      \"institution\": \"Dr. Babasaheb Ambedkar College, Deekshabhoomi Nagpur\",\n      \"startDate\": \"\",\n      \"endDate\": \"2022\"\n    },\n    {\n      \"degree\": \"SSC\",\n      \"institution\": \"Navjeevan Dnyanapeeth English Medium School, Pusad\",\n      \"startDate\": \"\",\n      \"endDate\": \"2020\"\n    }\n  ],\n  \"skills\": [\n    \"C\",\n    \"C++\",\n    \"JavaScript\",\n    \"Python\",\n    \"C#\",\n    \"HTML\",\n    \"CSS\",\n    \"SQL\",\n    \"React.js\",\n    \"Node.js\",\n    \"Express.js\",\n    \"MongoDB\",\n    \"TensorFlow\",\n    \"Keras\",\n    \"OpenCV\",\n    \"PyTorch\",\n    \"Pandas\",\n    \"NumPy\",\n    \"Git & GitHub\",\n    \"Unity\",\n    \"Adobe After Effects\",\n    \"Google Colab\",\n    \"Postman\",\n    \"Cloud Computing in AWS\",\n    \"SimulIDE\",\n    \"Team Collaboration\",\n    \"Problem-Solving\",\n    \"Communication\",\n    \"Leadership\",\n    \"Time Management\",\n    \"Adaptability\",\n    \"Critical Thinking\"\n  ]\n}\n"
                    }
                }
            ]
        },
        {
            "role": "assistant",
            "content": [
                {
                    "type": "text",
                    "text": "{\n  \"personal\": {\n    \"name\": \"KRISHNA KAMALAKAR PAIKINE\",\n    \"email\": \"\",\n    \"phone\": \"\",\n    \"address\": \"\"\n  },\n  \"summary\": \"\",\n  \"experience\": [\n    {\n      \"jobTitle\": \"Software Developer Intern\",\n      \"company\": \"CLOUD COUNSELAGE\",\n      \"startDate\": \"May'24\",\n      \"endDate\": \"June'24\",\n      \"description\": \"• Collaborated with the design team to implement responsive UI/UX designs, ensuring compatibility across various devices and browsers\\n• Utilized Git for version control to collaborate with team through GitHub, maintaining codebase integrity and fostering efficient teamwork\\n• Engaged in continuous learning and improvement, exploring new technologies to enhance development and programming skills\\n• Optimized backend services using Express.js reducing response times and implemented database schemas in MongoDB Database\"\n    }\n  ],\n  \"education\": [\n    {\n      \"degree\": \"B.TECH\",\n      \"institution\": \"IIT Kharagpur\",\n      \"startDate\": \"\",\n      \"endDate\": \"2026\"\n    },\n    {\n      \"degree\": \"HSC\",\n      \"institution\": \"Dr. Babasaheb Ambedkar College, Deekshabhoomi Nagpur\",\n      \"startDate\": \"\",\n      \"endDate\": \"2022\"\n    },\n    {\n      \"degree\": \"SSC\",\n      \"institution\": \"Navjeevan Dnyanapeeth English Medium School, Pusad\",\n      \"startDate\": \"\",\n      \"endDate\": \"2020\"\n    }\n  ],\n  \"skills\": [\n    \"C\",\n    \"C++\",\n    \"JavaScript\",\n    \"Python\",\n    \"C#\",\n    \"HTML\",\n    \"CSS\",\n    \"SQL\",\n    \"React.js\",\n    \"Node.js\",\n    \"Express.js\",\n    \"MongoDB\",\n    \"TensorFlow\",\n    \"Keras\",\n    \"OpenCV\",\n    \"PyTorch\",\n    \"Pandas\",\n    \"NumPy\",\n    \"Git & GitHub\",\n    \"Unity\",\n    \"Adobe After Effects\",\n    \"Google Colab\",\n    \"Postman\",\n    \"Cloud Computing in AWS\",\n    \"SimulIDE\",\n    \"Team Collaboration\",\n    \"Problem-Solving\",\n    \"Communication\",\n    \"Leadership\",\n    \"Time Management\",\n    \"Adaptability\",\n    \"Critical Thinking\"\n  ]\n}\n" }
}
\n\nExample output:\n{\n  \"personal\": {\n    \"name\": \"John Doe\",\n    \"email\": \"bS6pL@example.com\",\n    \"phone\": \"555-555-5555\",\n    \"address\": \"123 Main St, Anytown USA\"\n  },\n  \"summary\": \"A recent graduate with a strong foundation in computer science principles and a passion for software development. Seeking an entry-level position to gain practical experience and develop my skills. Proficient in Java, Python, and data structures and algorithms. Eager to learn and contribute to a collaborative team environment.\",\n  \"experience\": [\n    {\n      \"jobTitle\": \"Full Stack Developer\",\n      \"company\": \"Amazon, New York, NY\",\n      \"startDate\": \"Jan 2021\",\n      \"endDate\": \"\",\n      \"description\": \"Designed, developed, and maintained full-stack applications using React and Node.js. Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers. Maintaining the React Native in-house organization application. Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end and back-end systems.\"\n    },\n    {\n      \"jobTitle\": \"Frontend Developer\",\n      \"company\": \"Google, Charlotte, NC\",\n      \"startDate\": \"May 2019\",\n      \"endDate\": \"Jan 2021\",\n      \"description\": \"Designed, developed, and maintained full-stack applications using React and Node.js. Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers. Maintaining the React Native in-house organization application. Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end and back-end systems.\"\n    }\n  ],\n  \"education\": [\n    {\n      \"degree\": \"Master in Computer Science\",\n      \"institution\": \"Western Illinois University\",\n      \"startDate\": \"Aug 2018\",\n      \"endDate\": \"Dec 2019\"\n    },\n    {\n      \"degree\": \"Master in Computer Science\",\n      \"institution\": \"Western Illinois University\",\n      \"startDate\": \"Aug 2018\",\n      \"endDate\": \"Dec 2019\"\n    }\n  ],\n  \"skills\": [\n    \"Angular\",\n    \"React\",\n    \"MySql\",\n    \"React Native\"\n  ]\n}\n\nOnly extract what is clearly visible in the resume image. Do not hallucinate or make up data. Preserve original phrasing and formatting where possible.`;
    const result = await client.chat.completions.create({
      model: "Qwen/QVQ-72B-preview",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all information as per the instructions.  Do not add any extra keys except ones from system prompt."
            },
            {
              type: "image_url",
              image_url: { url: imageBase64 } // <-- Replace with your base64 string when testing
            }
          ]
        }
      ]
    });
    */

    // Try to parse the model's response as JSON
    let extracted = null;
    let text = result.choices?.[0]?.message?.content;
    // Remove markdown code block if present
    if (text && text.trim().startsWith('```')) {
      text = text.replace(/^```[a-zA-Z]*\n/, '').replace(/```$/, '').trim();
    }
    try {
      extracted = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: 'Failed to parse extracted information.', raw: text }, { status: 500 });
    }
    return NextResponse.json({ extracted });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 