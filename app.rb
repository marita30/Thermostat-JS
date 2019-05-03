require 'sinatra'
require 'json'



get '/' do
	headers 'Access-Control-Allow-Origin' => '*'
	content_type :json
	p $temperature
	if $temperature == nil
		@temperature = 20
		{temperature: @temperature }.to_json
	 else
	 @temperature = $temperature.to_i
	 {temperature: @temperature }.to_json
    end
	
end

post '/' do
	headers 'Access-Control-Allow-Origin' => '*'
	$temperature = params[:temp].to_i
end


 