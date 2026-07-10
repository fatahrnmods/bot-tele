const { parseResult, banner,success, Sukses, GetFotoProfile, pushname, gmt, weton, week, date, waktu, toJson,isUrl, range, argsGet } = require('./functions')

exports.sendProses = async(bot,ctx) => {
 let botReply = "Wait, Proses"
 bot.telegram.sendMessage(ctx.chat.id ,botReply,{reply_to_message_id: ctx.message.message_id})
 .then((result) => { 
   setTimeout(() => {
     bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
   }, 10 * 500)
 })
 .catch(err => console.log(err))
}

exports.format = async(seconds) => {
 function pad(s){ return (s < 10 ? `0` : ``) + s }
 var hours = Math.floor(seconds / (60*60));
 var minutes = Math.floor(seconds % (60*60) / 60);
 var seconds = Math.floor(seconds % 60);
 return pad(hours) + ` H,` + pad(minutes) + ` M,` + pad(seconds) + ` S`;
}

exports.sendText = async(bot,ctx,teks) => {
 bot.telegram.sendMessage(ctx.chat.id, teks, {
   reply_markup: {
     inline_keyboard: [[{ text: 'Back', callback_data: 'help'}]]
   },
   parse_mode: "HTML",
   disable_web_page_preview: true
 })
}

exports.sendMenu = async(bot,ctx,teks) => {
  bot.telegram.sendMessage(ctx.chat.id, teks, {
    reply_markup: {
      inline_keyboard: [[{ text: 'Back', callback_data: 'start'}]]
    },
    disable_web_page_preview: true
  })
}

exports.sendsearch = async(bot,ctx) => {
 let botReply = "Wait a moment.."
 bot.telegram.sendMessage(ctx.chat.id ,botReply,{reply_to_message_id: ctx.message.message_id})
 .then((result) => { 
   setTimeout(() => {
     bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
   }, 10 * 500)
 })
 .catch(err => console.log(err))
}

exports.sendDonation = async(bot,ctx) => {
 bot.telegram.sendMessage(ctx.chat.id, `• <b>DANA</b>\n⤷ 6285364937006\n\n• <b>Telkomsel Credit</b>\n⤷ 6285364937006\n\n<i>Very Thanks for Your donation 😁</i>`,
 {
   reply_markup: {
     inline_keyboard: [
       [
         { text: 'Back!🔙', callback_data: 'start'},
         { text: 'Owner🙍', url: 'http://t.me/'+config.ownerusername}
       ]
     ]
   },
   parse_mode: "HTML"
 })
}

exports.sendHelp = async(bot,ctx) => {
 bot.telegram.sendMessage(ctx.chat.id, `<b>Selamat datang</b>\nSilahkan pilih menu dibawah\n\n`, {
   reply_markup: {
     inline_keyboard: [
       [{ text: 'Menu Downloader', callback_data: 'downloadermenu'}],
       [{ text: 'Menu Fun', callback_data: 'funmenu'}],
       [{ text: 'Menu Search', callback_data: 'searchmenu'}],
       [{ text: 'Menu Random', callback_data: 'randomenu'}],
       [{ text: 'Menu Nsfw', callback_data: 'nsfwmenu'}],
       [{ text: 'Menu Admin', callback_data: 'adminmenu'}],
       [{ text: 'Menu Group', callback_data: 'groupmenu'}],
       [{ text: 'Start Anonymous Chat👥', callback_data: 'star'}],
       [{ text: 'Owner🙍', url: 't.me/'+config.ownerusername}],
       [
         { text: 'Donasi👼🏻', callback_data: 'donasi'},
         { text: 'Ping🚀', callback_data: 'ping'},
         { text: 'Info Bot🤖', callback_data: 'info'}
       ]
     ]
   },
   parse_mode: "HTML",
   disable_web_page_preview: true
 })
}

exports.sendStart = async(bot,ctx) => {
 try {
   var pp_user = await GetFotoProfile(bot,ctx.from.id || ctx.chat.id)
   ctx.replyWithPhoto({url: `https://raw.githubusercontent.com/fatahrnmods/test/refs/heads/main/logo.png`},{
     caption: `Hai Saya bot <b>${bot.botInfo.username}</b>`,
     reply_markup: {
       inline_keyboard: [
         [
           { text: 'Menu📚', callback_data: 'menu'},
           { text: 'Ping🚀', callback_data: 'ping'},
           { text: 'Info Bot🤖', callback_data: 'info'}
         ],
         [{ text: 'Start Anonymous Chat', callback_data: 'star'}],
         [
           { text: 'Donasi👼🏻', callback_data: 'donasi'},
           { text: 'Owner Bot🙍', url:'t.me/'+config.ownerusername}
         ],
         [{ text: 'RzSocial', url: 'https://social.rzkyfdlh.tech'}]
       ]
     },
     parse_mode: "HTML",
     disable_web_page_preview: true
   })
 } catch {
   bot.telegram.sendMessage(ctx.chat.id,'Hai Saya bot <b>'+bot.botInfo.username+'</b>',{
     reply_markup: {
       inline_keyboard: [
         [
           { text: 'Menu📚', callback_data: 'menu'},
           { text: 'Ping🚀', callback_data: 'ping'},
           { text: 'Info Bot🤖', callback_data: 'info'}
         ],
         [{ text: 'Start Anonymous Chat', callback_data: 'star'}],
         [
           { text: 'Donasi👼🏻', callback_data: 'donasi'},
           { text: 'Owner Bot🙍', url:'t.me/'+config.ownerusername}
         ],
         [{ text: 'RzSocial', url: 'https://social.rzkyfdlh.tech'}]
       ]
     },
     parse_mode: "HTML",
     disable_web_page_preview: true
   })
 }
}

exports.sendTest = async(bot,ctx) => {
 ctx.replyWithPhoto({url: `https://telegra.ph/file/4ab397f49255b2a79f687.jpg`},{
   caption: 'hai',
   reply_markup: {
     inline_keyboard: [
       [
         { text: 'Donasi👼🏻', callback_data: 'donasi'},
         { text: 'Menu📚', callback_data: 'menu'},
         { text: 'Ping🚀', callback_data: 'ping'},
         { text: 'Info Bot🤖', callback_data: 'info'}
       ],
       [{ text: 'RzSocial📱', url: 'https://social.rzkyfdlh.tech'}]
     ]
   },
   parse_mode: "HTML",
   disable_web_page_preview: true
 })
}

exports.getPosition = async(userId, _dir) => {
 let position = null
 Object.keys(_dir).forEach((i) => {
   if (_dir[i].id === userId) {
     position = i
   }
 })
 return position
}
