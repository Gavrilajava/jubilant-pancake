class ApplicationController < ActionController::Base

skip_before_action :verify_authenticity_token

def index
  user = User.find_by(secret_id: params[:user_secret_id])
  if !user
    render json: user
  end
end

def messages
  user = User.find_by(secret_id: params[:user_secret_id])
  render json: user.new_messages(params[:last_message_id])
end

def new_message
  user = User.find(params[:user_id])
  message = Message.create(user_id: user.id, channel_id: params[:channel_id], body: params[:body])
  render json: message.to_js
end

def new_channel
  user = User.find_by(secret_id: params[:channel][:user_secret_id])
  channel = Channel.create(owner_id: user.id, title: params[:channel][:title])
  render json: channel
end

def invite
  owner = User.find_by(secret_id: params[:invite][:user_secret_id])
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
