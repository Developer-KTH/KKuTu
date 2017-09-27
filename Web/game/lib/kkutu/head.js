/**
Rule the words! KKuTu Online
Copyright (C) 2017 JJoriping(op@jjo.kr)
Copyright (C) 2017 KKuTu Korea(op@kkutu.co.kr)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var MODE;
var BEAT = [ null,
	"10000000",
	"10001000",
	"10010010",
	"10011010",
	"11011010",
	"11011110",
	"11011111",
	"11111111"
];
var NULL_USER = {
	profile: { title: L['null'] },
	data: { score: 0 }
};
var MOREMI_PART;
var AVAIL_EQUIP;
var RULE;
var OPTIONS;
var MAX_LEVEL = 450;
var IDX_STAFF = 450;
var IDX_UNKNOWN_LEVEL = 451;
var TICK = 30;
var EXP = [];
var BAD = new RegExp(["느으*[^가-힣]*금마?", "니[^가-힣]*(엄|앰|엠)", "(ㅄ|ㅅㅂ|ㅂㅅ)", "미친(년|놈)?", "(병|븅|빙)[^가-힣]*신", "보[^가-힣]*지", "(새|섀|쌔|썌)[^가-힣]*(기|끼)", "섹[^가-힣]*스", "(시|씨|쉬|쒸)이*입?[^가-힣]*(발|빨|벌|뻘|팔|펄)", "십[^가-힣]*새", "씹", "(애|에)[^가-힣]*미", "자[^가-힣]*지", "존[^가-힣]*나", "좆|죶", "지랄", "창[^가-힣]*(녀|년|놈)", "fuck", "sex" ].join('|'), "g");
var advencedBAD = new RegExp(["(시|싀|쉬|슈|씨|쒸|씌|쓔|쑤|시이|싀이|쉬이|씨이|쒸이|씌이|찌이|스|쓰|쯔|스으|쓰으|쯔으|수우|쑤우|십|싑|쉽|슙|씹|쓉|씝|쓥|씁|싶|싚|슆|슾|앂|씦|쓒|씊|쑾|ㅅ|ㅆ|ㅅㅣ|ㅅ이|ㅆ이|c|c이|Ⓒ|Ⓒ이|씨이이|시이이|쓰으으|스으으)[^가-힣]*(바|파|발|팔|빠|빨|불|벌|벨|밸|빠|ㅂ|ㅃ|ㅍ)","(병|뱡|뱅|뱡|빙|븅|븽|뷰웅|비잉|볭|뱽|뼝|뺑|쁑|삥|삉|뺭|뼈엉|쀼웅|ㅂ)[^가-힣]*(신|싄|슨|씬|씐|진|즨|ㅅ|딱|시인|시나)","(새|섀|세|셰|쌔|쎄|썌|쎼)[^가-힣]*(끼|끠|애끼|에끼)","(저새|저색|저섀|저세|저셰|저쌔|저쎄|저썌|저쎼)[^가-힣]*(기|애기|에기)","(개|게|계|걔|깨|께|꼐|꺠)[^가-힣]*(새|세|섀|셰)","(니|닝|느|노|늬|너|쟤|유|걔|ㄴ)[^가-힣]*(ㄱㅁ|ㄱㅃ|ㅇㅁ|ㅇㅂ|엄마|검마|검|금|미|앰|앱|아빠|엄빠|의미|의비|븨|믜)","(ㄱㅁ|ㄱㅃ|ㅇㅁ|ㅇㅂ|엄마|검마|앰|아빠|엄빠)[^가-힣]*(죽|뒤|사|돌|없)","(앰|엠|얨|옘)[^가-힣]*(창|챵|촹|생|섕|셍|솅|쉥)","(세|섹|색|쉑|쇡|세크|새크|셍|셱|섁|세그|세엑|세액)[^가-힣]*(ㅅ|스|슥|슨|슫|슷|승|로스)","(ㅈ|젓|젔|젇|젖|좟|좠|좓|좢)[^가-힣]*(됟|됫|됬|됏|됐|됃|같|갇|까|가|까|카)","(잠|좌|잗|잣|쟈|보|볻|봇|뵤)[^가-힣]*(지|짓|짇|징|즤|즫|즷|즹|빨)","(질|입|안|밖)[^가-힣]*(싸)","(후|훚|훗|훋)[^가-힣]*(장|쟝|좡)","(꼬|보|딸|똘|빡)[^가-힣]*(추)","(미친|잡|쓰레기|거지|그지|똥|ㅣ발)[^가-힣]*(녀석|놈|충|자식|냐|냔|세|네|것)","(버|벅|뻐|뻑|퍽)[^가-힣]*(큐|뀨)","(호)[^가-힣]*(로|모|구)","(스|수|슈|쓰|쑤|쓔|스으|수우|슈우|쓰우|쑤으|쓔으)[^가-힣]*(레|래|럐|례|랙|렉|럑|롁|랚|렊|럒|롂)","(지|즤|디|G|ㅣ|치|찌|지이|즤이|G이)[^가-힣]*(랄|라알)","(딸)[^가-힣]*(딸|치|쳐|쳤|침)","발[^가-힣]*기","풀[^가-힣]*발","딸[^가-힣]*딸","강[^가-힣]*간","자[^가-힣]*위","부[^가-힣]*랄","불[^가-힣]*알","오[^가-힣]*르[^가-힣]*가[^가-힣]*즘","처[^가-힣]*녀[^가-힣]*막","질[^가-힣]*내","질[^가-힣]*외","정[^가-힣]*액","자[^가-힣]*궁","생[^가-힣]*리","월[^가-힣]*경","페[^가-힣]*도","또[^가-힣]*라[^가-힣]*이","장[^가-힣]*애","종[^가-힣]*간","쓰[^가-힣]*레[^가-힣]*기","무[^가-힣]*뇌","학[^가-힣]*식[^가-힣]*충","급[^가-힣]*식[^가-힣]*충","버[^가-힣]*러[^가-힣]*지","찌[^가-힣]*꺼[^가-힣]*기","삐[^가-힣]*꾸","닥[^가-힣]*쳐","꺼[^가-힣]*져","애[^가-힣]*자","찌[^가-힣]*그[^가-힣]*레[^가-힣]*기","대[^가-힣]*가[^가-힣]*리","면[^가-힣]*상","와[^가-힣]*꾸","시[^가-힣]*빠[^가-힣]*빠","파[^가-힣]*오[^가-힣]*후","사[^가-힣]*까[^가-힣]*시","씹[^가-힣]*덕","애[^가-힣]*미","엿[^가-힣]*먹","애[^가-힣]*비","새[^가-힣]*끼","줬[^가-힣]*까","(뒤)[^가-힣]*(져|진|졌|질|짐)","살[^가-힣]*지[^가-힣]*마","자[^가-힣]*살[^가-힣]*(해|하|헤)","(좆|좃|좄|졷|줫|줮|줟|죶|죳|죴|죧)","씹|씹","봊|봊","잦|잦","(섹|섻)","썅|썅","ㅗ|ㅗ","ㅄ|ㅄ","ㄲㅈ|ㄲㅈ","(ㅈ)[^가-힣]*(ㅂㅅ|ㄲ|ㄹ|ㄴ)","(f|F)[^A-Za-z]*(u|U)[^A-Za-z]*(c|C)[^A-Za-z]*(k|K)","(s|S)[^A-Za-z]*(h|H)[^A-Za-z]*(i|I)[^A-Za-z]*(t|T)","(d|D)[^A-Za-z]*(a|A)[^A-Za-z]*(d|D)","(m|M)[^A-Za-z]*(o|O)[^A-Za-z]*(m|M)","(m|M)[^A-Za-z]*(o|O)[^A-Za-z]*(t|T)[^A-Za-z]*(h|H)[^A-Za-z]*(e|E)[^A-Za-z]*(r|R)","(f|F)[^A-Za-z]*(a|A)[^A-Za-z]*(t|T)[^A-Za-z]*(h|H)[^A-Za-z]*(e|E)[^A-Za-z]*(r|R)","(d|D)[^A-Za-z]*(a|A)[^A-Za-z]*(m|M)[^A-Za-z]*(n|N)","(s|S)[^A-Za-z]*(h|H)[^A-Za-z]*(u|U)[^A-Za-z]*(t|T)","(b|B)[^A-Za-z]*(i|I)[^A-Za-z]*(t|T)[^A-Za-z]*(c|C)[^A-Za-z]*(h|H)","(d|D)[^A-Za-z]*(i|I)[^A-Za-z]*(c|C)[^A-Za-z]*(k|K)","(s|S)[^A-Za-z]*(e|E)[^A-Za-z]*x","(b|B)[^A-Za-z]*(a|A)[^A-Za-z]*(s|S)[^A-Za-z]*(t|T)[^A-Za-z]*(a|A)[^A-Za-z]*(r|R)[^A-Za-z]*(d|D)","(c|C)[^A-Za-z]*(u|U)[^A-Za-z]*(n|N)[^A-Za-z]*(t|T)","(p|P)[^A-Za-z]*(u|U)[^A-Za-z]*(s|S)[^A-Za-z]*(s|S)[^A-Za-z]*(y|Y)","(f|F)[^A-Za-z]*(a|A)[^A-Za-z]*(g|G)","(n|N)[^A-Za-z]*(i|I)[^A-Za-z]*(g|G)[^A-Za-z]*(g|G)[^A-Za-z]*(e|E)[^A-Za-z]*(r|R)","(n|N)[^A-Za-z]*(i|I)[^A-Za-z]*(g|G)[^A-Za-z]*(g|G)[^A-Za-z]*(a|A)","(n|N)[^A-Za-z]*(i|I)[^A-Za-z]*(g|G)[^A-Za-z]*(r|R)[^A-Za-z]*(o|O)","(j|J)[^A-Za-z]*(u|U)[^A-Za-z]*(n|N)[^A-Za-z]*(k|K)","(m|M)[^A-Za-z]*(u|U)[^A-Za-z]*(f|F)[^A-Za-z]*(f|F)","(p|P)[^A-Za-z]*(i|I)[^A-Za-z]*(s|S)[^A-Za-z]*(s|S)","(r|R)[^A-Za-z]*(e|E)[^A-Za-z]*(t|T)[^A-Za-z]*(a|A)[^A-Za-z]*(r|R)[^A-Za-z]*(d|D)","(s|S)[^A-Za-z]*(l|L)[^A-Za-z]*(u|U)[^A-Za-z]*(t|T)","(t|T)[^A-Za-z]*(i|I)[^A-Za-z]*(t|T)[^A-Za-z]*(s|S)","(t|T)[^A-Za-z]*(r|R)[^A-Za-z]*(a|A)[^A-Za-z]*(s|S)[^A-Za-z]*(h|H)","(t|T)[^A-Za-z]*(w|W)[^A-Za-z]*(a|A)[^A-Za-z]*(t|T)","(w|W)[^A-Za-z]*(a|A)[^A-Za-z]*(n|N)[^A-Za-z]*(k|K)","(w|W)[^A-Za-z]*(h|H)[^A-Za-z]*(o|O)[^A-Za-z]*(r|R)[^A-Za-z]*(e|E)","(s|S)[^A-Za-z]*(i|I)[^A-Za-z]*(b|B)[^A-Za-z]*(a|A)[^A-Za-z]*(l|L)","(g|G)[^A-Za-z]*(a|A)[^A-Za-z]*(s|S)[^A-Za-z]*(a|A)[^A-Za-z]*(k|K)[^A-Za-z]*(i|I)","(a|A)[^A-Za-z]*(s|S)[^A-Za-z]*(s|S)[^A-Za-z]*(h|H)[^A-Za-z]*(o|O)[^A-Za-z]*(l|L)[^A-Za-z]*(e|E)","(t|T)[^A-Za-z]*(l|L)[^A-Za-z]*q[^A-Za-z]*(k|K)[^A-Za-z]*(f|F)","(t|T)[^A-Za-z]*(p|P)[^A-Za-z]*(r|R)[^A-Za-z]*(t|T)[^A-Za-z]*(m|M)","(s|S)[^A-Za-z]*(e|E)[^A-Za-z]*(e|E)[^A-Za-z]*(b|B)[^A-Za-z]*(a|A)[^A-Za-z]*(l|L)","わ[^ぁ-んァ-ン]*る[^ぁ-んァ-ン]*く[^ぁ-んァ-ン]*ち","ぶ[^ぁ-んァ-ン]*べ[^ぁ-んァ-ン]*つ[^ぁ-んァ-ン]*","ゴ[^ぁ-んァ-ン]*ミ","ク[^ぁ-んァ-ン]*ズ","カ[^ぁ-んァ-ン]*ス","外[^ぁ-んァ-ン]*道","ゲ[^ぁ-んァ-ン]*ロ","ダ[^ぁ-んァ-ン]*メ[^ぁ-んァ-ン]*人[^ぁ-んァ-ン]*間","木[^ぁ-んァ-ン]*偶","ろ[^ぁ-んァ-ン]*く[^ぁ-んァ-ン]*で[^ぁ-んァ-ン]*な[^ぁ-んァ-ン]*し","ま[^ぁ-んァ-ン]*ぬ[^ぁ-んァ-ン]*け","ご[^ぁ-んァ-ン]*ろ[^ぁ-んァ-ン]*つ[^ぁ-んァ-ン]*き","バ[^ぁ-んァ-ン]*カ","ブ[^ぁ-んァ-ン]*ス","ビ[^ぁ-んァ-ン]*ッ[^ぁ-んァ-ン]*チ","さ[^ぁ-んァ-ン]*ん[^ぁ-んァ-ン]*し[^ぁ-んァ-ン]*た","死[^ぁ-んァ-ン]*に[^ぁ-んァ-ン]*損[^ぁ-んァ-ン]*な[^ぁ-んァ-ン]*い","さ[^ぁ-んァ-ン]*く[^ぁ-んァ-ン]*し[^ぁ-んァ-ン]*ょ[^ぁ-んァ-ン]*う","畜[^ぁ-んァ-ン]*生","鬼[^ぁ-んァ-ン]*畜","気[^ぁ-んァ-ン]*違[^ぁ-んァ-ン]*い","だ[^ぁ-んァ-ン]*ま[^ぁ-んァ-ン]*れ","く[^ぁ-んァ-ン]*そ","で[^ぁ-んァ-ン]*て[^ぁ-んァ-ン]*い[^ぁ-んァ-ン]*け","し[^ぁ-んァ-ン]*ん[^ぁ-んァ-ン]*じ[^ぁ-んァ-ン]*ま[^ぁ-んァ-ン]*え","く[^ぁ-んァ-ン]*た[^ぁ-んァ-ン]*ば[^ぁ-んァ-ン]*れ","馬[^ぁ-んァ-ン]*鹿[^ぁ-んァ-ン]*や[^ぁ-んァ-ン]*ろ[^ぁ-んァ-ン]*う","ば[^ぁ-んァ-ン]*か[^ぁ-んァ-ン]*た[^ぁ-んァ-ン]*れ"].join("|"));

var ws, rws;
var $stage;
var $sound = {};
var $_sound = {}; // 현재 재생 중인 것들
var $data = {};
var $lib = { Classic: {}, Jaqwi: {}, Crossword: {}, Typing: {}, Hunmin: {}, Daneo: {}, Sock: {}, PictureQuiz: {} };
var $rec;
var mobile;

var audioContext = window.hasOwnProperty("AudioContext") ? (new AudioContext()) : false;
var _WebSocket = window['WebSocket'];
var _setInterval = setInterval;
var _setTimeout = setTimeout;

function isStaff(o) {
	return o.equip['BDG'] == 'b1_gm' || o.equip['BDG'] == 'b1_designer' || o.equip['BDG'] == 'b1_planner' || o.equip['BDG'] == 'b1_bgm' || o.equip['BDG'] == 'b1_video' || o.equip['BDG'] == 'b1_word';
}

function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}
