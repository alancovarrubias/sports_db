class AuthenticationController < ApiController
 skip_before_action :authenticate_request, only: [:authenticate]

 def authenticate
   command = AuthenticateUser.call(params[:username], params[:password])
   user = User.find_by_username(params[:username])
   if command.success?
     render json: { auth_token: command.result, username: user.username, name: user.name }
   else
     render json: { error: command.errors }, status: :unauthorized
   end
 end

 def user
   render json: { user: @current_user }
 end
end
