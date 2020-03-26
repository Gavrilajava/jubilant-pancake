class Message < ApplicationRecord
  belongs_to :user
  belongs_to :channel

  def to_js(usr)
    {
      "self": {
        name: usr.name,
        id: usr.id
      },
      "icon": self.user.picture,
      "created": self.created_at,
      "body": self.body,
      "sender": self.user.name,
      "id": self.id,
      "channel_id": self.channel_id
    }
  end
end
