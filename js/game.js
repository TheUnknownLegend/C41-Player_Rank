class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = db.ref('gameState');

        gameStateRef.on("value",function(data){
            gameState = data.val();
        });
    }

    update(state){
        db.ref ('/').update({
            gameState:state
        })
    }

    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await db.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();

            }

            player.getCount();
            
            form = new Form();
            form.display();
        }

        car1 = createSprite(350 ,200 );
        car2 = createSprite(550 ,200 );
        car3 = createSprite(750 ,200 );
        car4 = createSprite(950 ,200 );

        cars = [car1 , car2 ,car3 , car4];

        car1.addImage(car1Img);       
        car2.addImage(car2Img);
        car3.addImage(car3Img);
        car4.addImage(car4Img);

        passedFinish = false;
    }

    play(){
        form.hideForm();

        image(track ,0 , -displayHeight*4 , displayWidth , displayHeight * 5);



        textSize(22);
        text("Game Start",120,100);

        Player.getPlayerInfo();

        player.getFinishedPlayers();

        if(allPlayers != undefined){
            var displayPos = 130;

            var index = 0;

            var x = 250;
            var y;

            for (var plr in allPlayers){
                index = index + 1;

                y = displayHeight - allPlayers[plr].distance;

                x = x + 250;

                cars[index - 1].x = x;

                cars[index - 1].y = y;

                if(plr === "player" + player.index){
                    fill("red");
                    console.log("hello");

                    ellipse(cars[index - 1].x , y , 60, 60);

                    camera.position.x = displayWidth/2;

                    camera.position.y = cars[index - 1].y;

                }
                    textAlign(CENTER);
                    text(allPlayers[plr].name , cars[index - 1],y + 100);
            }

        }

        if (keyIsDown(UP_ARROW) && player.index != null && passedFinish === false){
            player.distance += 50;
            player.update();
        }

        if(player.distance > 5050 && passedFinish === false){
            Player.updateFinishedPlayers();
            player.rank = finishedPlayers;
            player.update();

            passedFinish = true;
        }

          drawSprites();

    }

    displayRanks(){
        console.log("hall0");

        camera.position.x = 0;
        camera.position.y = 0;

        Player.getPlayerInfo();
        imageMode(CENTER);

        image(bronze_img , displayWidth/-4 , -100 + displayHeight/9, 200, 240); 
        image(silver_img, displayWidth/4, -100 + displayHeight/10, 225, 270); 
        image(gold_img, 0, -100, 250, 300);

        textAlign(CENTER);
        textSize(42);

        for(var plr in allPlayers){
            if(allPlayers[plr].rank == 1){
                text("1st : " + allPlayers[plr].name , 0 , 85);
            }
            else if(allPlayers[plr].rank == 2){
                text("2nd : " + allPlayers[plr].name , displayWidth/4 , displayHeight/9 + 73);
            }
            else if(allPlayers[plr].rank == 3){
                text("3rd : " + allPlayers[plr].name , displayWidth/-4 , displayHeight/10 + 76);
            }
        }

    }
}