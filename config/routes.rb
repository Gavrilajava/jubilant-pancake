Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/:user_secret_id', to: 'application#index'
  get '/:user_secret_id/:last_message_id', to: 'application#messages'
  post '/:user_secret_id', to: 'application#new_message'
  post '/channels', to: 'application#new_channel'
  post '/invite', to: 'application#invite' 
end
