json.content @message.content
json.image @message.image.url
json.id @message.id
json.date @message.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.user_name @message.user.name