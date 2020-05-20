new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        logs: []
    },
    watch: {
        monsterHealth: function(value)
        {
            if (value <= 0)
                alert("you win");
        },
        playerHealth: function(value)
        {
            if (value <= 0)
                alert("you lose!");
        }
    },
    methods:{
        reset: function()
        {
            this.playerHealth= 100;
            this.monsterHealth= 100;
            this.gameIsRunning= false;
            this.logs = [];
        },
        startGame: function()
        {
            if (!this.gameIsRunning)
            {
                this.reset();
                this.logs.push(this.getLog(true, 'game started'));
                this.gameIsRunning= true;
            }
            else
                this.logs.push(this.getLog(true, 'game already started!'));

        },
        attack: function() {
            this.generateAttack(this.calculateDamage(1, 20), this.calculateDamage(5, 12));
        },
        specialAttack: function() {
            this.generateAttack(this.calculateDamage(5, 8), this.calculateDamage(12, 25));
        },
        heal: function() {
            if (!this.gameIsRunning)
                return;

            this.playerHealth += 10;
            this.playerHealth -= 2;
            if (this.playerHealth > 100)
                this.playerHealth = 100;

            this.logs.push(this.getLog(true, 'player heal'));                
        },
        giveUp: function() {
            this.reset();
        },
        generateAttack: function(playerDamage, monsterDamage)
        {
            if (this.gameIsRunning)
            {  
                if ((this.monsterHealth > 0) && (this.playerHealth > 0))
                {
                    if ((this.monsterHealth - monsterDamage) > 0)
                        this.monsterHealth -= monsterDamage; 
                    else
                        this.monsterHealth = 0; 

                    if ((this.playerHealth - playerDamage) > 0)
                        this.playerHealth -= playerDamage; 
                    else
                        this.playerHealth = 0;                         
                    
                    this.logs.push(this.getLog(true, 'player - ' + playerDamage)); 
                    this.logs.push(this.getLog(false, 'monster - ' + monsterDamage)); 
                }
                
                if (this.monsterHealth <= 0)
                    this.logs.push(this.getLog(false, 'calm down hero, monster is already dead!'));                        

                if (this.playerHealth <= 0)
                    this.logs.push(this.getLog(true, 'greate hero! what is dead may never die!'));
            }
            else
                this.logs.push(this.getLog(true, 'start the game first'));                 
        },
        getLog: function(isPlayer, message)
        {
            return {isPlayer, message};
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
    }
})