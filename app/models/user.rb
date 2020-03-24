class User < ApplicationRecord
    # has_many :user_channels
    # has_many :channels, through: :user_channels
    has_many :channels, :foreign_key => "owner_id"
    has_many :messages
    has_many :channels, through: :messages

    # Test whether user is owner of a channel, for deletion/admin purposes
    def is_owner(channel)
        channel.owner == self
    end

    # Return all channels for which the user is an owner
    def channels_owned
        Channel.all.select do |channel|
            is_owner(channel)
        end
    end

# Passes in a post's id and returns new posts related to a user's channels.
    # Each outer array index corresponds to a user's channels (that they have posted in)
    # Each inner array is made of posts made in that channel, after the "last_id"
    def new_messages(last_id)
        self.channels.map do |channel|
            { title: channel.title,
              owner: channel.owner.name,
              image: channel.owner.picture,
              messages: channel.messages.includes(:user).select{|message| message.id > last_id.to_i}.map{|message| {
                sender: message.user.name,
                icon: message.user.picture,
                created: message.created_at,
                body: message.body
              }}
            }
        end
    end

end
