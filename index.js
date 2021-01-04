const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready',() => {
    console.log('Logged in!');
});

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});
    client.on('message', message => {
    if (!message.content.startsWith(config.prefix) ||message.author.bot) return;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
       
        const command = args.shift().toLowerCase();
        //message.channel.send(command);
        switch (command) {
            case 'eval': {
                try {
                    let out = eval(args.join(' '));
                    if (typeof out === 'function') out = out.toString();
                    else out = require('util').inspect(out);
                    message.channel.send("\`\`\`\n" + out + "\`\`\`");
                } catch (e) {
                    console.log(e);
                    message.channel.send("\`\`\`\n" + e.message + "\`\`\`");
                }
                break;
            }
            case 'hi': {
              message.channel.send('Hi, '+message.author.username+'!');
              message.channel.send('I am a Bot made by Tejas');
              message.channel.send('My prefix character is : !');
            break;
            }
            case 'server': {
              message.channel.send('Server name: ' + message.guild.name + '\nTotal members: ' + message.guild.memberCount);
            break;
            }
            case 'args-info': {
              if(!args.length){
                  return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
              }

              message.channel.send(`Command name: ${command}\nArguments: ${args}`);
            break; 
            }
            case 'kick':{
                if (!message.mentions.users.size) {
                   return message.reply('you need to tag a user in order to kick them!');
                }
                const taggedUser = message.mentions.users.first();
                message.channel.send(`You have kicked : ${taggedUser.username}`);
            break;
            }
            case 'cmd':{
             const { spawn } = require('child_process');
             const ls = spawn('ls', ['-lh', '/usr']);

             ls.stdout.on('data', (data) => {
             console.log(`stdout: ${data}`);
             });

             ls.stderr.on('data', (data) => {
             console.error(`stderr: ${data}`);
             });

             ls.on('close', (code) => {
             console.log(`child process exited with code ${code}`);
             }); 	
             break;   
            }
            case 'good':{
            try {
            const arg = args.shift().toLowerCase();
               if(arg === 'morning'){
                message.channel.send('Good Morning,'+message.author.username+'!');
               } 
               else if(arg === 'night'){
                message.channel.send('Good Night, '+message.author.username+'!');
               }
               else {
            	message.channel.send('Whats good in this!! lol');
               }
            } 
            catch (e) {
                    console.log(e);
                    message.channel.send('Whats good in this!! lol');
                }

            break;
            }
            default: {
            message.channel.send("Unable to find that command.");
            break;
            }
        }           
           
});


client.login(config.token);
