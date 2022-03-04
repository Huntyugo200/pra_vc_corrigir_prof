const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var frutaimagem;
var fundoimagem;
var coelhoimagem;
var coelho;
var botao;
var comendo;
var piscando;
var triste;

function preload(){
  frutaimagem=loadImage("melon.png");
  coelhoimagem=loadImage("Rabbit-01.png");
  fundoimagem=loadImage("background.png");
  comendo=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  piscando=loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  triste=loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  //definindo reprodução das animaçoes
  piscando.playing=true;
  comendo.playing=true;
  triste.playing=true;
  //evitando repeticoes
  comendo.looping=false;
  triste.looping=false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,700,600,20);
  coelho=createSprite(230,620,100,100);
  coelho.scale=0.3;
  botao=createImg("cut_btn.png");
  botao.position(220,30);
  botao.size(50,50);
  botao.mouseClicked(cortarcorda);
  //controlando velocidade da animação 
  comendo.frameDelay=20;
  piscando.frameDelay=20;
  triste.frameDelay=20;
  coelho.addAnimation("comendo",comendo);
  coelho.addAnimation("piscando",piscando);
  coelho.addAnimation("triste",triste);
  //escolhendo qual aimação usar 
  coelho.changeAnimation("piscando");

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(fundoimagem);
  Engine.update(engine);
  rope.show();
  image(frutaimagem,fruit.position.x,fruit.position.y,60,60);
  
  ground.show();

 drawSprites();
   
}

function cortarcorda(){
  //quebrando corda
  rope.break();
  //excluindo restrição 
  fruit_con.detach();
  fruit_con=null;
}
