async function sendToTelegram({ otpCode, token, chatId }) {
  const message = `<code>${otpCode}</code>`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
}

module.exports = { sendToTelegram };
