class ApplicationController < ActionController::Base

def index
  user = User.find_by(secret_id: params[:user_secret_id])
  if !user
    render json: user
  end
end

def messages
  user = User.find_by(user_secret_id: params[:user_secret_id])
  render json: user.new_messages(params[:last_message_id])
end

def new_message
  user = User.find_by(user_secret_id: params[:message][:user_secret_id])
  message = Message.create(user_id: user.id, channel_id: params[:message][:channel_id], body: params[:message][:body])
  render json: message
end

def new_channel
  user = User.find_by(user_secret_id: params[:channel][:user_secret_id])
  channel = Channel.create(owner_id: user.id, title: params[:channel][:title])
  render json: channel
end

def invite
  owner = User.find_by(user_secret_id: params[:invite][:user_secret_id])
  channel = Channel.find(params[:invite][:channel_id])
  if channel.owner_id == owner.id
    invite = UserChannel.create(user_id: params[:invite][:user_id], channel_id: channel.id)
    render json: invite
  else 
    render json {"not enough rights"}
  end
end

private



end
