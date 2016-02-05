#first and formost pull from git. make sure you are up to date with the repo.

#install nodejs

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs


#install mongoDB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org

#install git

sudo apt-get update
sudo apt-get install -y git

#install build-essentials
sudo apt-get install -y build-essential

# cd to root
#cd to vagrant/IntroNet

# npm i --save express morgan body-parser cookie-parser debug ejs mongojs
#sudo npm i --save-dev -g gulp
#npm i --save-dev gulp-nodemon gulp-jshint gulp-livereload browser-sync
#sudo npm i -g bower
#bower i --save jquery bootstrap angular angular-route


#navigate to http://localhost:8000
#should populate with a todolist