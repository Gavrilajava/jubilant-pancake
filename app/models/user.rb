class User < ApplicationRecord
    # has_many :user_channels
    # has_many :channels, through: :user_channels
    has_many :channels, :foreign_key => "owner_id"
    has_many :messages
    has_many :channels, through: :messages

    validates :name, uniqueness: true

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

    def all_users_as_string
        user_array = User.all.map{|user| user.name}
        return user_array.join(", ")
    end

    def users_not_in_channel(channel)
        (User.all - channel.users).map{|user| user.name}.join(", ")
    end

# Passes in a post's id and returns new posts related to a user's channels.
    # Each outer array index corresponds to a user's channels (that they have posted in)
    # Each inner array is made of posts made in that channel, after the "last_id"
    def new_messages(last_id)
        {
          self: {
          id: self.id,
          name: self.name,
          picture: self.picture
          },
          channels:
          self.channels.map { |channel|
              { title: channel.title,
                owner: channel.owner.name,
                image: channel.owner.picture,
                id: channel.id,
                # memberCount: channel.members.count,
                nonMembers: self.users_not_in_channel(channel),
                messages: channel.messages.includes(:user).select{|message| message.id > last_id.to_i}.map{|message| {
                  sender: message.user.name,
                  icon: message.user.picture,
                  created: message.created_at,
                  body: message.body,
                  id: message.id
                }}
              }
          }.uniq
        }
    end

end
