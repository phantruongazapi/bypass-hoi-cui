const { Client, GatewayIntentBits, Events, Message } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');  
const { Routes } = require('discord-api-types/v9');
const axios = require('axios')
const { REST } = require('@discordjs/rest');
const fs = require('fs');
const cron = require('node-cron');
const { SlashCommandBuilder } = require('@discordjs/builders');

const token = ''; //mã token bot
const clientId = ''; // id bot
const advertise = false; //if you want it to send server invite after command ran keep it true if not keep it false
const serverinvite = "Bot hiện tại đang trong beta sẽ phát truyển nhiều hơn cảm ơn bạn đã sử dụng bot của chúng tôi, nếu có lỗi nào thì hãy liên hệ cho <@1171401940320661509> cảm ơn"; 
// lời mời máy chủ khi lệnh chạy nó sẽ trả lời bằng lời mời máy chủ
const madeby = "phantruong"; // để nhúng như "Made By {name}"
const apikey = "tUnAZj3sS74DJo9BUb8tshpVhpLJLA"; 
const apikey1 = "phantruong";
const apikey2 = "phantruongdpzai";

// URLs cho các nút bấm
const serverLink = 'https://discord.gg/TqavfTe9ZH';  // Thay bằng link server thực tế
const inviteLink = '';  // Thay bằng link invite bot thực tế


const commands = [
    {        
        name: 'delta',
        description: 'Bypass Delta Key',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Delta link',
                required: true,
            },
        ],
    },
    {        
        name: 'codex',
        description: 'Bypass codex',
        options: [
            {
                name: 'codex',
                type: 3,
                description: 'The codex link',
                required: true,
            },
        ],
    },
    {
        name: 'arceusx',
        description: 'Whitelist Arceus X',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Arceus link',
                required: true,
            },
        ],
    },
    {        
        name: 'hydrogen',
        description: 'Bypass Hydrogen Key',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Hydrogen link',
                required: true,
            },
        ],
    }, 
    {        
        name: 'relzhub',
        description: 'Bypass Relz Hub Key',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Relz Hub link',
                required: true,
            },
        ],
    }, 
    {        
        name: 'fluxus',
        description: 'Bypass Fluxus Key',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Fluxus link',
                required: true,
            },
        ],
    }, 
    {
        name: 'vegax',
        description: 'Bypass VegaX Key',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The VegaX link',
                required: true,
            },
        ],
    },
];
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });  // Đảm bảo bạn sử dụng đúng các intent
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing global application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Khóa bypass thành công fully reloaded global application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log('Bot Status On');

    client.user.setPresence({
        activities: [{ name: 'Liên Quân Top 1 <33333333', type: 'PLAYING' }],
        status: 'dnd' // Đặt trạng thái là Do Not Disturb
    })
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'delta') {
        await delta(interaction);
        if(advertise == false ){
            await interaction.followUp({ content: `${serverinvite}`, ephemeral: true });
        }else{
            return;
        }   
    } else if (interaction.commandName === 'codex') {
        await codex(interaction);
        if(advertise == false ){
            await interaction.followUp({ content: `${serverinvite}`, ephemeral: true });
        }else{
            return;
        } 
    } else if (interaction.commandName === 'arceusx') {
        await arceusx(interaction);
        if(advertise == false ){
            await interaction.followUp({ content: `${serverinvite}`, ephemeral: true });
        }else{
            return;
        } 
    } else if (interaction.commandName === 'relzhub') {
        await relzhub(interaction);
        if(advertise == false ){
            await interaction.followUp({ content: `${serverinvite}`, ephemeral: true });
        }else{
            return;
        }
    } else if (interaction.commandName === 'fluxus') {
        await fluxus(interaction);
        if(advertise == false ){
            await interaction.followUp({ content: `${serverinvite}`, ephemeral: true });
        }else{
            return;
        }
    } else if (interaction.commandName === 'hydrogen') {
        await hydrogen(interaction);
        if(advertise == false ){
            await interaction.followUp({ content: `${serverinvite}`, ephemeral: true });
        }else{
            return;
        }
    } else if (interaction.commandName === 'vegax') {
        await vegax(interaction);
        if(advertise == false ){
            await interaction.followUp({ content: `${serverinvite}`, ephemeral: true });;
        }else{
            return;
        }
    }
});

async function delta(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";
    const userAvatar = interaction.user.displayAvatarURL({ dynamic: true, size: 4096 }); // Lấy avatar của người dùng

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Link server bot')
                .setStyle(ButtonStyle.Link)
                .setURL(serverLink),
            new ButtonBuilder()
                .setLabel('Invite bot')
                .setStyle(ButtonStyle.Link)
                .setURL(inviteLink)
        );

    await interaction.reply({
        embeds: [new EmbedBuilder()
            .setTitle("Vui lòng chờ Đang Bypass <a:LOAD:1284446764228939877>")
            .setColor(0x10a3de)
            .setThumbnail(userAvatar)
            .setFields([{ name: 'Status', value: `${box}Vui lòng đợi 0-60 giây\nnếu nó quá lâu thì host hoạt bot đg lỗi ${box}` }])
        ],
        components: [row]
    });

    if (link.startsWith('https://gateway.platoboost.com/a/8?id=')) { // Kiểm tra điều kiện chính xác cho URL Delta
        const urlParams = new URLSearchParams(new URL(link).search);
        const hwid = urlParams.get('id'); // Lấy HWID từ link
        const apiUrl = `https://phantruong-bypass.vercel.app/bypass?url=${encodeURIComponent(link)}&api_key=${apikey1}`;

        try {
            const start = Date.now();
            const response = await axios.get(apiUrl);
            const end = Date.now();
            const time = (end - start) / 1000;

            if (response.data.key) {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Khóa bypass thành công <a:THANHCONG:1284446782235082782>")
                        .setColor(0x17e628)
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: '🔑 Key Delta:', value: `${box}${response.data.key}${box}` },
                            { name: '⏳Response Time:', value: `${box}${time} Seconds${box}` }
                        ])
                        .setFooter({ text: `Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row]
                });
            } else {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Khóa bypass lỗi ❌")
                        .setColor(0xde0202)
                        .setThumbnail(userAvatar)
                        .setFields([{ name: 'Status:', value: '```Lỗi liên kết. Vui lòng thử lại.```' }])
                        .setFooter({ text: `Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row]
                });
            }
        } catch (error) {
            console.error('Error occurred:', error);
            await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setTitle("Khóa bypass lỗi ❌")
                    .setColor(0xde0202)
                    .setThumbnail(userAvatar)
                    .setImage('https://cdn.discordapp.com/avatars/1171401940320661509/1bf0e86d5e3f17f922156cbe48bab749.webp?size=4096')
                    .setFields([{ name: 'Status:', value: '```Api Delta Down🥹```' }])
                    .setFooter({ text: `Made by ${madeby}` })
                    .setTimestamp()
                ],
                components: [row]
            });
        }
    } else {
        await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setTitle("Invalid link please try again ❌")
                .setColor(0xde0202)
                .setFields([{ name: 'Link', value: `${box}${link}${box}` }])
            ],
            components: [row]
        });
    }
}



async function vegax(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Link server bot')
                .setStyle(ButtonStyle.Link)
                .setURL(serverLink),
            new ButtonBuilder()
                .setLabel('Invite bot')
                .setStyle(ButtonStyle.Link)
                .setURL(inviteLink)
        );

    await interaction.reply({
        embeds: [new EmbedBuilder()
            .setTitle("Vui lòng chờ Đang Bypass <a:LOAD:1284446764228939877>")
            .setColor(0x10a3de)
            .setThumbnail(userAvatar)
            .setFields([{ name: 'Status', value: `${box}Vui lòng đợi 0-60 giây\n nếu nó quá lâu thì host hoạt bot đg lỗi ${box}` }])
        ],
        components: [row]
    });

    if (link.startsWith('https://pandadevelopment.net/getkey?service=vegax&hwid=')) {
        const urlParams = new URLSearchParams(new URL(link).search);
        const hwid = urlParams.get('hwid');
        const apiUrl = `https://stickx.top/api-vegax/?hwid=${hwid}&api_key=${apikey}`;

        try {
            const start = Date.now();
            const response = await axios.get(apiUrl);
            const end = Date.now();
            const time = (end - start) / 1000;

            if (response.data.key) {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Khóa bypass thành công <a:THANHCONG:1284446782235082782>")
                        .setColor(0x17e628)
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: '🔑 Key Vegax:', value: `${box}${response.data.key}${box}` },
                            { name: '⏳Response Time:', value: `${box}${time} Seconds${box}` }
                        ])
                        .setFooter({ text: `Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row]
                });
            } else {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Khóa bypass lỗi")
                        .setColor(0xde0202)
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: 'Status:', value: `${box}Lỗi liên kết Vui lòng thử lại.${box}` }
                        ])
                        .setFooter({ text: `Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row]
                });
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setTitle("Khóa bypass lỗi ❌")
                    .setColor(0xde0202)
                    .setThumbnail(userAvatar)
                    .setFields([{ name: 'Status:', value: `${box}Api Vegax Down🥹.${box}` }])
                    .setFooter({ text: `Made by ${madeby}` })
                    .setTimestamp()
                ],
                components: [row]
            });
        }
    } else {
        await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setTitle("Invalid link please try again ❌")
                .setColor(0xde0202)
                .setFields([{ name: 'Link', value: `${box}${link}${box}` }])
            ],
            components: [row]
        });
    }
}


async function arceusx(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Link server bot')
                .setStyle(ButtonStyle.Link)
                .setURL(serverLink),
            new ButtonBuilder()
                .setLabel('Invite bot')
                .setStyle(ButtonStyle.Link)
                .setURL(inviteLink)
        );

    await interaction.reply({
        embeds: [new EmbedBuilder()
            .setTitle("Whitelisting Your Arceus")
            .setThumbnail(userAvatar)
            .setFields([{ name: 'Status', value: `${box}May take a while...${box}` }])
        ],
        components: [row]
    });

    if (link.startsWith('https://spdmteam.com/key-system-1?hwid=')) {
        const hwid = link.split('=')[1].split('&')[0];
        const apiUrl = `https://stickx.top/api-arceusx/?hwid=${hwid}&api_key=${apikey}`;

        try {
            const start = Date.now(); 
            const response = await axios.get(apiUrl);
            const end = Date.now();
            const time = (end - start) / 1000; 

            if (response.data.key === "Key System completed!") {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Successfully Whitelisted Arceus")
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: 'Status:', value: `${box}Successfully Whitelisted. Please Wait For Countdown Or Restart Roblox.${box}` },
                            { name: 'HWID:', value: `${box}${hwid}${box}` },
                            { name: 'Time Taken:', value: `${box}${time} Seconds${box}` }
                        ])
                        .setFooter({ text: `Requested By ${interaction.user.username} | Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row]
                });            
            } else {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Failed To Whitelist Arceus")
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: 'Status:', value: `${box}Either HWID Is Invalid Or API Is Not Working.${box}` },
                            { name: 'HWID:', value: `${box}${hwid}${box}` }
                        ])
                        .setFooter({ text: `Requested By ${interaction.user.username} | Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row]
                });                       
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setTitle("Failed To Whitelist Arceus")
                    .setThumbnail(userAvatar)
                    .setFields([{ name: 'Status:', value: `${box}Either API Is Offline Or Not Responding.${box}` }])
                    .setFooter({ text: `Requested By ${interaction.user.username} | Made by ${madeby}` })
                    .setTimestamp()
                ], 
                components: [row]
            });         
        }
    } else {
        await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setTitle("Invalid Arceus Link")
                .setFields([{ name: 'Link', value: `${box}${link}${box}` }])
            ],
            components: [row]
        });
    }
}


async function codex(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Link server bot')
                .setStyle(ButtonStyle.Link)
                .setURL(serverLink),
            new ButtonBuilder()
                .setLabel('Invite bot')
                .setStyle(ButtonStyle.Link)
                .setURL(inviteLink)
        );

    // Kiểm tra xem link có phải là null hoặc undefined không
    if (!link) {
        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle("Invalid Link")
                .setDescription("The provided link is invalid or missing.")
                .setColor(0xff0000) // Màu đỏ (RGB)
            ],
            components: [row] // Thêm components ở đây
        });
        return;
    }

    // Gửi phản hồi ban đầu cho người dùng
    await interaction.reply({
        embeds: [new EmbedBuilder()
            .setTitle("Whitelisting Your Codex")
            .setThumbnail(userAvatar)
            .setFields([{ name: 'Status', value: `${box}May take a while...${box}` }])
            .setColor(0xffff00) // Màu vàng (RGB) để chỉ định trạng thái đang xử lý
        ],
        components: [row] // Thêm components ở đây
    });

    // Kiểm tra định dạng liên kết
    if (link.startsWith('https://mobile.codex.lol?token=') || link.startsWith('https://mobile.codex.loltoken=')) {
        const token = link.split('=')[1];
        const apiUrl = `https://stickx.top/api-codex/?token=${token}&api_key=${apikey}`;

        try {
            const start = Date.now(); 
            const response = await axios.get(apiUrl);
            const end = Date.now();
            const time = (end - start) / 1000; // Thời gian xử lý

            if (response.data.key === "CodeX completed!!") {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Successfully Whitelisted Codex")
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: 'Status:', value: `${box}Successfully Whitelisted. Wait Up To A Minute Or Restart Roblox.${box}` },
                            { name: 'Token:', value: `${box}${token}${box}` },
                            { name: 'Time Taken:', value: `${box}${time} Seconds${box}` }
                        ])
                        .setColor(0x00ff00) // Màu xanh lá (RGB) để chỉ định thành công
                        .setFooter({ text: `Requested By ${interaction.user.username} | Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row] // Thêm components ở đây
                });
            } else {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Failed To Whitelist Codex")
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: 'Status:', value: `${box}Either Token Is Invalid Or Api Is Not Working.${box}` },
                            { name: 'Token:', value: `${box}${token}${box}` }
                        ])
                        .setColor(0xff0000) // Màu đỏ (RGB) để chỉ định lỗi
                        .setFooter({ text: `Requested By ${interaction.user.username} | Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row] // Thêm components ở đây
                });
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setTitle("Failed To Whitelist Codex")
                    .setThumbnail(userAvatar)
                    .setFields([{ name: 'Status:', value: `${box}Either Api Is Offline Or Not Responding.${box}` }])
                    .setColor(0xff0000) // Màu đỏ (RGB) để chỉ định lỗi
                    .setFooter({ text: `Requested By ${interaction.user.username} | Made by ${madeby}` })
                    .setTimestamp()
                ],
                components: [row] // Thêm components ở đây
            });
        }
    } else {
        await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setTitle("Invalid Codex Link")
                .setFields([{ name: 'Link', value: `${box}${link}${box}` }])
                .setColor(0xff0000) // Màu đỏ (RGB) để chỉ định lỗi
            ],
            components: [row] // Thêm components ở đây
        });
    }
}

async function relzhub(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Link server bot')
                .setStyle(ButtonStyle.Link)
                .setURL(serverLink),
            new ButtonBuilder()
                .setLabel('Invite bot')
                .setStyle(ButtonStyle.Link)
                .setURL(inviteLink)
        );

    await interaction.reply({
        embeds: [new EmbedBuilder()
            .setTitle("Vui lòng chờ Đang Bypass <a:LOAD:1284446764228939877>")
            .setColor(0x10a3de)
            .setThumbnail(userAvatar)
            .setFields([{ name: 'Status', value: '```Vui lòng đợi 0-60 giây\n nếu nó quá lâu thì host hoạt bot đg lỗi ```' }])
        ],
        components: [row] // Thêm components ở đây
    });

    if (link.startsWith('https://getkey.relzscript.xyz/redirect.php?hwid=')) {
        const urlParams = new URLSearchParams(new URL(link).search);
        const hwid = urlParams.get('hwid');
        const apiUrl = `https://bypass-sable.vercel.app/relzscript?link=${link}&apikey=${apikey}`;

        try {
            const start = Date.now();
            const response = await axios.get(apiUrl);
            const end = Date.now();
            const time = (end - start) / 1000;

            if (response.data.key) {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Khóa bypass thành công <a:THANHCONG:1284446782235082782>")
                        .setColor(0x17e628)
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: '🔑 Key relz hub', value: `${box}${response.data.key}${box}` },
                            { name: '⏳Response Time:', value: `${box}${time} Seconds${box}` }
                        ])
                        .setFooter({ text: `Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row] // Thêm components ở đây
                });
            } else {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Khóa bypass lỗi ❌")
                        .setColor(0xde0202)
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: 'Status:', value: '```Lỗi liên kết Vui lòng thử lại.```' },
                            { name: 'HWID:', value: `${box}${hwid}${box}` }
                        ])
                        .setFooter({ text: `Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row] // Thêm components ở đây
                });
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setTitle("Khóa bypass lỗi ❌")
                    .setColor(0xde0202)
                    .setThumbnail(userAvatar)
                    .setFields([{ name: 'Status:', value: '```Api Relz Hub Down🥹.```' }])
                    .setFooter({ text: `Made by ${madeby}` })
                    .setTimestamp()
                ],
                components: [row] // Thêm components ở đây
            });
        }
    } else {
        await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setTitle("Invalid link please try again ❌")
                .setColor(0xde0202)
                .setFields([{ name: 'Link', value: `${box}${link}${box}` }])
            ],
            components: [row] // Thêm components ở đây
        });
    }
}


async function hydrogen(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Link server bot')
                .setStyle(ButtonStyle.Link)
                .setURL(serverLink),
            new ButtonBuilder()
                .setLabel('Invite bot')
                .setStyle(ButtonStyle.Link)
                .setURL(inviteLink)
        );

    await interaction.reply({
        embeds: [new EmbedBuilder()
            .setTitle("Vui lòng chờ Đang Bypass <a:LOAD:1284446764228939877>")
            .setColor(0x10a3de)
            .setThumbnail(userAvatar)
            .setFields([{ name: 'Status', value: '```Vui lòng đợi 0-60 giây\n nếu nó quá lâu thì host hoạt bot đg lỗi ```' }])
        ],
        components: [row] // Thêm components ở đây
    });

    if (link.startsWith('https://gateway.platoboost.com/')) {
        const urlParams = new URLSearchParams(new URL(link).search);
        const hwid = urlParams.get('hwid');
        const apiUrl = `https://stickx.top/api-hydrogen/?hwid=${hwid}&api_key=E99l9NOctud3vmu6bPne`;

        try {
            const start = Date.now();
            const response = await axios.get(apiUrl);
            const end = Date.now();
            const time = (end - start) / 1000;

            if (response.data.key) {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Khóa bypass thành công <a:THANHCONG:1284446782235082782>")
                        .setColor(0x17e628)
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: '🔑 Key Hydrogen:', value: `${box}${response.data.key}${box}` },
                            { name: '⏳Response Time:', value: `${box}${time} Seconds${box}` }
                        ])
                        .setFooter({ text: `Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row] // Thêm components ở đây
                });
            } else {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Khóa bypass lỗi ❌")
                        .setColor(0xde0202)
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: 'Status:', value: '```Lỗi liên kết Vui lòng thử lại.```' },
                            { name: 'HWID:', value: `${box}${hwid}${box}` }
                        ])
                        .setFooter({ text: `Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row] // Thêm components ở đây
                });
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setTitle("Khóa bypass lỗi ❌")
                    .setColor(0xde0202)
                    .setThumbnail(userAvatar)
                    .setImage('https://cdn.discordapp.com/avatars/1171401940320661509/1bf0e86d5e3f17f922156cbe48bab749.webp?size=4096')
                    .setFields([{ name: 'Status:', value: '```Api Hydrogen Down🥹```' }])
                    .setFooter({ text: `Made by ${madeby}` })
                    .setTimestamp()
                ],
                components: [row] // Thêm components ở đây
            });
        }
    } else {
        await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setTitle("Invalid link please try again ❌")
                .setColor(0xde0202)
                .setFields([{ name: 'Link', value: `${box}${link}${box}` }])
            ],
            components: [row] // Thêm components ở đây
        });
    }
}

async function fluxus(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";
    const userAvatar = interaction.user.displayAvatarURL({ dynamic: true, size: 4096 }); // Lấy avatar của người dùng

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Link server bot')
                .setStyle(ButtonStyle.Link)
                .setURL(serverLink),
            new ButtonBuilder()
                .setLabel('Invite bot')
                .setStyle(ButtonStyle.Link)
                .setURL(inviteLink)
        );

    await interaction.reply({
        embeds: [new EmbedBuilder()
            .setTitle("Vui lòng chờ Đang Bypass <a:LOAD:1284446764228939877>")
            .setColor(0x10a3de)
            .setThumbnail(userAvatar)  // Hiển thị avatar người dùng
            .setFields([{ name: 'Status', value: `${box}Vui lòng đợi 0-60 giây\n nếu nó quá lâu thì host hoạt bot đg lỗi ${box}` }])
        ],
        components: [row]
    });

    if (link.startsWith('https://flux.li/android/external/start.php?HWID=')) { // Kiểm tra điều kiện chính xác cho URL
        const apiUrl = `https://api-vip.vercel.app/bypass?url=${encodeURIComponent(link)}&api_key=${apikey2}`;

        try {
            const start = Date.now();
            const response = await axios.get(apiUrl);
            const end = Date.now();
            const time = (end - start) / 1000;

            if (response.data.key) {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Khóa bypass thành công <a:THANHCONG:1284446782235082782>")
                        .setColor(0x17e628)
                        .setThumbnail(userAvatar)
                        .setFields([
                            { name: '🔑 Key fluxus:', value: `${box}${response.data.key}${box}` },
                            { name: '⏳Response Time:', value: `${box}${time} Seconds${box}` }
                        ])
                        .setFooter({ text: `Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row]
                });
            } else {
                await interaction.editReply({
                    embeds: [new EmbedBuilder()
                        .setTitle("Khóa bypass lỗi ❌")
                        .setColor(0xde0202)
                        .setThumbnail(userAvatar)
                        .setFields([{ name: 'Status:', value: '```Lỗi liên kết. Vui lòng thử lại.```' }])
                        .setFooter({ text: `Made by ${madeby}` })
                        .setTimestamp()
                    ],
                    components: [row]
                });
            }
        } catch (error) {
            console.error('Error occurred:', error);
            await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setTitle("Khóa bypass lỗi ❌")
                    .setColor(0xde0202)
                    .setThumbnail(userAvatar)
                    .setImage('https://cdn.discordapp.com/avatars/1171401940320661509/1bf0e86d5e3f17f922156cbe48bab749.webp?size=4096')
                    .setFields([{ name: 'Status:', value: '```Api Fluxus Down🥹```' }])
                    .setFooter({ text: `Made by ${madeby}` })
                    .setTimestamp()
                ],
                components: [row]
            });
        }
    } else {
        await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setTitle("Invalid link please try again ❌")
                .setColor(0xde0202)
                .setFields([{ name: 'Link', value: `${box}${link}${box}` }])
            ],
            components: [row]
        });
    }
}



client.login(token); // Đăng nhập vào bot
