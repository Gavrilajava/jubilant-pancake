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

u1 = User.create(name: "Stephen", secret_id: "PLASTICFROGANGRY", picture: "https://ca.slack-edge.com/T02MD9XTF-USLN1N0SX-639efefc59a2-512")
u2 = User.create(name: "Georgii", secret_id: "CROWMADMAD", picture: "https://ca.slack-edge.com/T02MD9XTF-UT0CK9T0W-4af6961d5e2f-512")
u3 = User.create(name: "Gian", secret_id: "VANQUISHERLAZYASSED", picture: "https://ca.slack-edge.com/T02MD9XTF-UT02BF45V-d2c2929beb02-512")
u4 = User.create(name: "Vien", secret_id: "ASSASSINPINKISH", picture: "https://ca.slack-edge.com/T02MD9XTF-UT0CKCHM4-d85747745415-512")
u5 = User.create(name: "Anam", secret_id: "WRECKERSILLY", picture: "https://ca.slack-edge.com/T02MD9XTF-USY6EKLM6-af7ea1ef79db-512")
u6 = User.create(name: "Cornelius", secret_id: "WARLOCKVISIBLE", picture: "https://ca.slack-edge.com/T02MD9XTF-USY6SP64V-fa39ad136590-512")
u7 = User.create(name: "Placido", secret_id: "BRAVOGREAT", picture: "https://ca.slack-edge.com/T02MD9XTF-USXNH137E-89dd6e280ab5-512")
u8 = User.create(name: "Somaia", secret_id: "WITCHDOCTORPESKY", picture: "https://ca.slack-edge.com/T02MD9XTF-UT57884MV-8720f9540343-512")
u9 = User.create(name: "Caleb", secret_id: "ROMANTICISTCOMMON", picture: "https://ca.slack-edge.com/T02MD9XTF-UT02BHX47-1e2b6e51a86d-512")
u10 = User.create(name: "Paul", secret_id: "MAGICIANRAPID", picture: "https://ca.slack-edge.com/T02MD9XTF-UT0CKBCEA-68204ed2834e-512")
u11 = User.create(name: "Vidhi", secret_id: "WRECKERGILDED", picture: "https://ca.slack-edge.com/T02MD9XTF-UC3ERUJ02-b5539e15f97e-512")
u12 = User.create(name: "Mitchell", secret_id: "DANGERCHROMATIC", picture: "https://ca.slack-edge.com/T02MD9XTF-USN0UKEF3-ga7f1b91df9c-512")
u13 = User.create(name: "Raul", secret_id: "MUGGERGOVERNING", picture: "https://ca.slack-edge.com/T02MD9XTF-UJ9CHTFG9-35b3f11767f4-512")
u14 = User.create(name: "Jeannie", secret_id: "THREATCHROMATIC", picture: "https://ca.slack-edge.com/T02MD9XTF-UBNRC7J4U-047650415f6f-512")
u15 = User.create(name: "Blake", secret_id: "SEEKERSPUNKY", picture: "https://ca.slack-edge.com/T02MD9XTF-USKCR43A6-357e1c9dbb7c-512")
u16 = User.create(name: "CleverBot", secret_id: "HAL9000", picture: "https://static01.nyt.com/images/2018/05/15/arts/01hal-voice1/merlin_135847308_098289a6-90ee-461b-88e2-20920469f96a-articleLarge.jpg?quality=75&auto=webp&disable=upscale")

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