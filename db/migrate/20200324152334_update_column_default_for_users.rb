class UpdateColumnDefaultForUsers < ActiveRecord::Migration[6.0]
  def change
    change_column_default(
      :users,
      :picture,
      from: nil,
      to: "http://picsum.photos/300"
    )
  end
end
