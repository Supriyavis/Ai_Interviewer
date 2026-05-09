import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newMessage = new Contact({ name, email, message });

    await newMessage.save();

    res.json({ message: "Message sent successfully ✅" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};