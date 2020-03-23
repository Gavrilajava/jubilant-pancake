# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Channel.destroy_all
# UserChannel.destroy_all
Message.destroy_all

u1 = User.create(name: "Stephen", secret_id: "test01")
u2 = User.create(name: "Georgii", secret_id: "test02")
u3 = User.create(name: "Gian", secret_id: "test03")
u4 = User.create(name: "Vien", secret_id: "test04")
u5 = User.create(name: "Anam", secret_id: "test05")
u6 = User.create(name: "Cornelius", secret_id: "test06")
u7 = User.create(name: "Placido", secret_id: "test07")
u8 = User.create(name: "Somaia", secret_id: "test08")
u9 = User.create(name: "Caleb", secret_id: "test09")
u10 = User.create(name: "Paul", secret_id: "test10")
u11 = User.create(name: "Vidhi", secret_id: "test11")
u12 = User.create(name: "Mitchell", secret_id: "test12")
u13 = User.create(name: "Raul", secret_id: "test13")
u14 = User.create(name: "Jeannie", secret_id: "test14")
u15 = User.create(name: "Blake", secret_id: "test15")
u16 = User.create(name: "ChatBot", secret_id: "HAL9000")

c1 = Channel.create(title: "Beer", owner_id: u1.id)
c2 = Channel.create(title: "Vodka", owner_id: u2.id)
c3 = Channel.create(title: "Coding", owner_id: u11.id)
c4 = Channel.create(title: "Vim", owner_id: u9.id)

Message.create(body: "What", user_id: u1.id, channel_id: c3.id)
Message.create(body: "should", user_id: u2.id, channel_id: c3.id)
Message.create(body: "I", user_id: u3.id, channel_id: c3.id)
Message.create(body: "code", user_id: u4.id, channel_id: c3.id)
Message.create(body: "today?", user_id: u5.id, channel_id: c3.id)
Message.create(body: "Something", user_id: u6.id, channel_id: c3.id)
Message.create(body: "that", user_id: u7.id, channel_id: c3.id)
Message.create(body: "will", user_id: u8.id, channel_id: c3.id)
Message.create(body: "blow", user_id: u9.id, channel_id: c3.id)
Message.create(body: "your", user_id: u10.id, channel_id: c3.id)
Message.create(body: "mind.", user_id: u11.id, channel_id: c3.id)
Message.create(body: "Maybe", user_id: u12.id, channel_id: c3.id)
Message.create(body: "an", user_id: u13.id, channel_id: c3.id)
Message.create(body: "evil", user_id: u14.id, channel_id: c3.id)
Message.create(body: "AI", user_id: u15.id, channel_id: c3.id)
Message.create(body: "I support this, Dave.", user_id: u16.id, channel_id: c3.id)
Message.create(body: "Brews", user_id: u1.id, channel_id: c1.id)
Message.create(body: "To your health", user_id: u1.id, channel_id: c2.id)
Message.create(body: "Cheers", user_id: u2.id, channel_id: c2.id)
Message.create(body: "Vim is the best!", user_id: u9.id, channel_id: c4.id)
Message.create(body: "Dammit, not this again. How do I get out of here?", user_id: u10.id, channel_id: c4.id)