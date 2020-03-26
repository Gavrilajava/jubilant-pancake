class Channel < ApplicationRecord
  belongs_to :owner, :class_name => "User"
  has_many :messages
  has_many :users, through: :messages

  def to_js
    {
      channel: {
        "title": self.title,
        "owner": self.owner.name,
        "image": self.owner.picture,
        "id": self.id
      },
      message: {
        "sender": self.owner.name,
        "icon": self.owner.picture,
        "created": self.messages.first.created_at,
        "body": self.messages.first.body,
        "id": self.messages.first.id
      },
      self: {
        "name": self.owner.name,
        "id": self.owner.id
      }
    }
  end
end
