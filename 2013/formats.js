/**
 * Seasonal Ladders of Pokémon Showdown
 * The formats with the mod-like tweaks go into /config/formats.js
 * The team making scripts go into /data/scripts.js
 *
 * THIS IS A BACKUP FILE.
 */

'use strict';

exports.Formats = [
	// Valentine Venture, February 2013
	{
		name: "[Seasonal] Valentine Venture",
		mod: 'gen5',

		team: 'randomSeasonalVV',
		gameType: 'doubles',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'Cancel Mod'],
	},
	// Spring Forward, March 2013
	{
		name: "[Seasonal] Spring Forward",
		mod: 'gen5',

		team: 'randomSeasonalSF',
		teamLength: {
			battle: 3,
		},
		greenPokemon: new Set([
			'bulbasaur', 'ivysaur', 'venusaur', 'caterpie', 'metapod', 'bellsprout', 'weepinbell', 'victreebel',
			'scyther', 'chikorita', 'bayleef', 'meganium', 'spinarak', 'natu', 'xatu', 'bellossom', 'politoed',
			'skiploom', 'lavitar', 'tyranitar', 'celebi', 'treecko', 'grovyle', 'sceptile', 'dustox',
			'lotad', 'lombre', 'ludicolo', 'breloom', 'electrike', 'roselia', 'gulpin', 'vibrava', 'flygon',
			'cacnea', 'cacturne', 'cradily', 'keckleon', 'tropius', 'rayquaza', 'turtwig', 'grotle', 'torterra',
			'budew', 'roserade', 'carnivine', 'yanmega', 'leafeon', 'shaymin', 'shayminsky', 'snivy', 'servine', 'serperior',
			'pansage', 'simisage', 'swadloon', 'cottonee', 'whimsicott', 'petilil', 'lilligant', 'basculin', 'maractus',
			'trubbish', 'garbodor', 'solosis', 'duosion', 'reuniclus', 'axew', 'fraxure', 'golett', 'golurk', 'virizion',
			'tornadus', 'tornadustherian', 'burmy', 'kakuna', 'beedrill', 'sandshrew', 'nidoqueen', 'zubat', 'golbat',
			'oddish', 'gloom', 'mankey', 'poliwrath', 'machoke', 'machamp', 'doduo', 'dodrio', 'grimer', 'muk', 'kingler',
			'cubone', 'marowak', 'hitmonlee', 'tangela', 'mrmime', 'tauros', 'kabuto', 'dragonite', 'mewtwo', 'marill',
			'hoppip', 'espeon', 'teddiursa', 'ursaring', 'cascoon', 'taillow', 'swellow', 'pelipper', 'masquerain', 'azurill',
			'minun', 'carvanha', 'huntail', 'bagon', 'shelgon', 'salamence', 'latios', 'tangrowth', 'seismitoad', 'jellicent',
			'elektross', 'druddigon', 'bronzor', 'bronzong', 'gallade',
		]),
		onBegin() {
			if (this.randomChance(3, 4)) {
				this.add('-message', "March and April showers bring May flowers...");
				this.setWeather('Rain Dance');
				delete this.weatherData.duration;
			}
		},
		onSwitchIn(pokemon) {
			if (this.getFormat().greenPokemon.has(pokemon.template.speciesid)) {
				this.add('-message', pokemon.name + " drank way too much!");
				pokemon.addVolatile('confusion');
				pokemon.statusData.time = 0;
			}
		},
		onBeforeMove(attacker, defender, move) {
			if (move.id === 'barrage') {
				this.add('-message', "You found a little chocolate egg!");
			}
		},
		onModifyMove(move) {
			if (move.id === 'barrage') {
				move.category = 'Special';
				move.type = 'Grass';
				move.basePower = 35;
				move.critRatio = 2;
				move.accuracy = 100;
				move.multihit = [3, 5];
				move.onHit = function (target, source) {
					this.heal(Math.ceil(source.maxhp / 40), source);
				};
			} else if (move.id === 'eggbomb') {
				move.category = 'Special';
				move.type = 'Grass';
				move.basePower = 100;
				move.willCrit = true;
				move.accuracy = 100;
				move.onHit = function (target, source) {
					this.add('-message', source.name + " ate a big chocolate egg!");
					this.heal(source.maxhp / 8, source);
				};
				// Too much chocolate, you get fat. Also with STAB it's too OP
				move.self = {boosts: {spe: -2, spa: -1}};
			} else if (move.id === 'softboiled') {
				move.heal = [3, 4];
				move.onHit = function (target) {
					this.add('-message', target.name + " ate a delicious chocolate egg!");
				};
			} else {
				// As luck is everywhere...
				move.critRatio = 2;
			}
		},
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'Cancel Mod'],
	},
	// Fools Festival, April 2013
	{
		name: "[Seasonal] Fools Festival",
		mod: 'gen5',

		team: 'randomSeasonalFF',
		onBegin() {
			let dice = this.random(100);
			if (dice < 65) {
				this.add('-message', "April showers bring May flowers...");
				this.setWeather('Rain Dance');
			} else if (dice < 95) {
				this.add('-message', "What a wonderful spring day! Let's go picnic!");
				this.setWeather('Sunny Day');
			} else {
				this.add('-message', "Bollocks, it's hailing?! In april?! Curse you, spring!!");
				this.setWeather('Hail');
			}
			delete this.weatherData.duration;
		},
		onSwitchIn(pokemon) {
			let name = (pokemon.ability === 'illusion' && pokemon.illusion) ? pokemon.illusion.name : pokemon.name;
			let stonedPokemon = {Koffing: 1, Weezing: 1, Slowpoke: 1, Slowbro: 1, Slowking: 1, Psyduck: 1, Spinda: 1};
			let stonerQuotes = ['your face is green!', 'I just realised that Arceus fainted for our sins', 'I can, you know, feel the colors',
				"you're my bro", "I'm imaginining a new color!", "I'm smelling the things I see!", 'hehe, hehe, funny', "I'm hungry!", 'we are pokemanz',
				'Did you know that Eevee backwards is eevee?! AMAZING', 'aaaam gonna be the verrrry best like no one evar wasss',
				"I feel like someone is watching us through a screen!", "come at me bro"];
			if (name in stonedPokemon) {
				this.add('-message', name + ": Duuuuuude, " + this.sample(stonerQuotes));
				this.boost({spe: -1, def: 1, spd: 1}, pokemon, pokemon, {fullname: 'high'});
			}
			// Pokemon switch in messages
			let msg = '';
			switch (name) {
			case 'Ludicolo':
				msg = "¡Ay, ay, ay! ¡Vámonos de fiesta, ya llegó Ludicolo!";
				break;
			case 'Missingno':
				msg = "Hide yo items, hide yo data, missingno is here!";
				break;
			case 'Slowpoke': case 'Slowbro':
				let didYouHear = ['Black & White are coming out soon!', 'Genesect has been banned to Ubers!',
					'Smogon is moving to Pokemon Showdown!', "We're having a new thing called Seasonal Ladder!", 'Deoxys is getting Nasty Plot!'];
				msg = 'Did you hear? ' + this.sample(didYouHear);
				break;
			case 'Spinda':
				msg = "LOOK AT ME I'M USING SPINDA";
				break;
			case 'Whimsicott':
				msg = 'Oh dear lord, not SubSeed again!';
				break;
			case 'Liepard':
				msg = '#yoloswag';
				break;
			case 'Tornadus':
				msg = "It's HURRICANE time!";
				break;
			case 'Riolu':
				msg = 'Have you ever raged so hard that you smashed your keyboard? Let me show you.';
				break;
			case 'Gastly': case 'Haunter': case 'Gengar':
				msg = 'Welcome to Trolledville, population: you';
				break;
			case 'Amoonguss':
				msg = 'How do you feel about three sleep turns?';
				break;
			case 'Shaymin-Sky':
				msg = 'Do you know what paraflinch is? huehue';
				break;
			case 'Ferrothorn':
				msg = 'inb4 Stealth Rock';
				break;
			}
			if (msg !== '') {
				this.add('-message', msg);
			}
		},
		onModifyMove(move) {
			let dice = this.random(100);
			if (dice < 40) {
				let type = '';
				switch (move.type.toLowerCase()) {
				case 'rock':
				case 'ground':
					type = 'Grass';
					break;
				case 'fire':
				case 'bug':
					type = 'Water';
					break;
				case 'water':
				case 'grass':
					type = 'Fire';
					break;
				case 'flying':
					type = 'Fighting';
					break;
				case 'fighting':
					type = 'Flying';
					break;
				case 'dark':
					type = 'Bug';
					break;
				case 'dragon':
				case 'electric':
					type = 'Ice';
					break;
				case 'ghost':
					type = 'Normal';
					break;
				case 'ice':
					type = 'Electric';
					break;
				case 'normal':
				case 'poison':
					type = 'Ghost';
					break;
				case 'psychic':
					type = 'Dark';
					break;
				case 'steel':
					type = 'Poison';
					break;
				}

				move.type = type;
				this.add('-message', 'lol trolled, I changed yo move type');
			}

			// Additional changes
			if (move.id === 'bulkup') {
				move.onHit = function (target, source, move) {
					let name = (target.ability === 'illusion' && target.illusion) ? target.illusion.name : target.name;
					this.add('-message', name + ': Do you even lift, bro?!');
				};
			} else if (move.id === 'charm' || move.id === 'sweetkiss' || move.id === 'attract') {
				let pickUpLines = {
					M: [
						'have you been to Fukushima recently? Because you are glowing tonight!',
						'did it hurt when you fell to the earth? Because you must be an angel!', 'can I buy you a drink?',
						'roses are red / lemons are sour / spread your legs / and give me an hour',
						"roses are red / violets are red / I'm not good with colors", "Let's go watch cherry bossoms together (´･ω･`)",
						"Will you be my Denko? (´･ω･`)",
					],
					F: [
						'Do you go to the gym? You are buff!', "Guy, you make me hotter than July.",
						"While I stare at you I feel like I just peed myself", "Let's go to my apartment to have midnight coffee",
						"Marry me, I wanna have 10 kids of you!", "Go out with me or I'll twist your neck!", "Man, you have some nice abs, can I touch them?",
					],
				};
				let rejectLines = {
					F: [
						'Uuuh... how about no', "gtfo I'm taken", 'I have to water the plants. On Easter Island. For a year. Bye',
						'GO AWAY CREEP', 'Do you smell like rotten eggs?', "I wouldn't date you even if you were the last Pokemon on earth.",
					],
					M: [
						"I'd rather get it on with a dirty daycare Ditto", "I'm not realy sure you're clean",
						"Ew, you're disgusting!", "It's not me, it's you. Go away, ugly duckling.", "Not really interested *cough*weirdo*cough*",
					],
				};
				move.onTryHit = function (target, source, move) {
					if (!(source.gender in pickUpLines)) return;
					let pickUpLine = this.sampleNoReplace(pickUpLines[source.gender]);
					let name = (source.ability === 'illusion' && source.illusion) ? source.illusion.name : source.name;
					let targetName = (target.ability === 'illusion' && target.illusion) ? target.illusion.name : target.name;
					this.add('-message', name + ': Hey, ' + targetName + ', ' + pickUpLine);
				};
				move.onMoveFail = function (target, source, move) {
					// Returns false so move calls onHit and onMoveFail
					if (!(target.gender in rejectLines)) return;
					let answer = this.sampleNoReplace(rejectLines[target.gender]);
					let targetName = (target.ability === 'illusion' && target.illusion) ? target.illusion.name : target.name;
					if (!target.volatiles['attract']) {
						this.add('-message', targetName + ': ' + answer);
					}
				};
			} else if (move.id === 'taunt') {
				let quotes = [
					"Yo mama so fat, she 4x resists Ice- and Fire-type attacks!",
					"Yo mama so ugly, Captivate raises her opponent's Special Attack!",
					"Yo mama so dumb, she lowers her Special Attack when she uses Nasty Plot!",
					"Yo mama so fat, Smogon switched to Pokemon Showdown because PO had an integer overflow bug when you used Grass Knot against her!",
					"Yo mama so dumb, she thought Sylveon would be Light Type!",
				];
				move.onHit = function (target, source) {
					let sourceName = (source.ability === 'illusion' && source.illusion) ? source.illusion.name : source.name;
					this.add('-message', sourceName + ' said, "' + quotes.sample() + '"');
				};
			}
		},
		onFaint(pokemon) {
			// A poem every time a Pokemon faints
			let haikus = [
				"You suck a lot / You are a bad trainer / let a mon faint", "they see me driving / round town with the girl i love / and I'm like, haikou",
				"Ain't no Pokemon tough enough / ain't no bulk decent enough / ain't no recovery good enough / to keep me from fainting you, babe",
				"Roses are red / violets are blue / you must be on some med / 'coz as a trainer you suck",
				"You're gonna be the very worst / like no one ever was / to lose all the battles is your test / to faint them all is your cause",
				'Twinkle twinkle little star / fuck you that was my best sweeper', "I'm wheezy and I'm sleezy / but as a trainer you're measly",
				"You're sharp as a rock / you're bright as a hole / you're one to mock / you could be beaten by a maimed mole",
				"Alas, poor trainer! I knew him, your Pokémon, a fellow of infinite jest, of most excellent fancy.",
			];
			this.add('-message', this.sampleNoReplace(haikus));
		},
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'Cancel Mod'],
	},
	{
		name: "[Seasonal] May Mayhem",
		mod: 'gen5',

		team: 'randomSeasonalMM',
		onBegin() {
			// Shameless plug
			let day = new Date().getDay();
			if (day === 12) {
				this.add('-message', 'Wish a HAPPY BIRTHDAY to Treecko32!!');
			}
			if (day === 16) {
				this.add('-message', 'Wish a HAPPY BIRTHDAY to Joim!!');
			}
		},
		onSwitchIn(pokemon) {
			let dice = this.random(100);
			if (dice < 25) {
				this.add('-message', 'Never gonna give you up, never gonna let you down');
			}
		},
	},
	{
		name: "[Seasonal] June Jubilee",
		mod: 'gen5',

		team: 'randomSeasonalJJ',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onBegin() {
			this.add(
				'-message', "Greetings, trainer! Delibird needs your help! It's lost in the US and it needs to find its way back to the arctic " +
				"before summer starts! Help your Delibird while travelling north, but you must defeat the opponent before he reaches there first!"
			);
			this.setWeather('Sunny Day');
			delete this.weatherData.duration;

			this.seasonal = {'none': false, 'drizzle': false, 'hail': false};
		},
		onBeforeMove(pokemon, target, move) {
			// Reshiram changes weather with its tail until you reach the arctic
			if (pokemon.template.speciesid === 'reshiram' && this.turn < 15) {
				let weatherMsg = '';
				let dice = this.random(100);
				if (dice < 25) {
					this.setWeather('Rain Dance');
					weatherMsg = 'a Drizzle';
				} else if (dice < 50) {
					this.setWeather('Sunny Day');
					weatherMsg = 'a Sunny Day';
				} else if (dice < 75) {
					this.setWeather('Hail');
					weatherMsg = 'Hail';
				} else {
					this.setWeather('Sandstorm');
					weatherMsg = 'a Sandstorm';
				}
				this.add('-message', "Reshiram caused " + weatherMsg + " with its tail!");
				delete this.weatherData.duration;
			}

			if (this.turn >= 4 && this.seasonal.none === false) {
				this.add('-message', "You are travelling north and you have arrived to North Dakota! There's a clear sky and the temperature is lower here.");
				this.clearWeather();
				this.seasonal.none = true;
			}
			if (this.turn >= 8 && this.seasonal.drizzle === false) {
				this.add('-message', "You are travelling further north and you have arrived to Edmonton! It started raining a lot... and it's effing cold.");
				this.setWeather('Rain Dance');
				delete this.weatherData.duration;
				this.seasonal.drizzle = true;
			}
			if (this.turn >= 12 && this.seasonal.hail === false) {
				this.add('-message', "You have arrived to the arctic! Defeat the other trainer so Delibird can be free!");
				this.setWeather('Hail');
				delete this.weatherData.duration;
				this.seasonal.hail = true;
			}
		},
		onFaint(pokemon) {
			if (pokemon.template.id === 'delibird') {
				let name = pokemon.side.name;
				let winner = '';
				if (pokemon.side.id === 'p1') {
					winner = 'p2';
				} else {
					winner = 'p1';
				}
				this.add(
					'-message', "No!! You let Delibird down. He trusted you. You lost the battle, " + name +
					". But you lost something else: your Pokémon's trust."
				);
				pokemon.battle.win(winner);
			}
		},
	},
	{
		name: "[Seasonal] Jolly July",
		mod: 'gen5',

		team: 'randomSeasonalJuly',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onBegin() {
			this.add('-message', "You and your faithful favourite Pokémon are travelling around the world, and you will fight this trainer in many places until either win or finish the travel!");
			// ~learn international independence days with PS~
			switch (new Date().getDay()) {
			case 4:
				// 4th of July for the US
				this.add('-message', "FUCK YEAH 'MURICA!");
				break;
			case 5:
				// 5th independence day of Algeria and Venezuela
				this.add('-message', "¡Libertad para Venezuela o muerte!");
				break;
			case 9:
				// 9th independence day of Argentina and South Sudan
				this.add('-message', "¡Che, viteh que somos libres!");
				break;
			case 10:
				// Bahamas
				this.add('-message', "Free the beaches!");
				break;
			case 20:
				// Colombia
				this.add('-message', "¡Independencia para Colombia!");
				break;
			case 28:
				// Perú
				this.add('-message', "¡Per\u00fa libre!");
				break;
			}

			// Set up the cities you visit around the world
			this.cities = {
				'N': [
					'Madrid', 'Paris', 'London', 'Ghent', 'Amsterdam', 'Gdansk',
					'Munich', 'Rome', 'Rabat', 'Stockholm', 'Moscow', 'Beijing',
					'Tokyo', 'Dubai', 'New York', 'Vancouver', 'Los Angeles',
					'Edmonton', 'Houston', 'Mexico DF', 'Barcelona', 'Blanes',
				],
				'S': [
					'Buenos Aires', 'Lima', 'Johanesburg', 'Sydney', 'Melbourne',
					'Santiago de Chile', 'Bogota', 'Lima', 'Montevideo',
					'Wellington', 'Canberra', 'Jakarta', 'Kampala', 'Mumbai',
					'Auckland', 'Pretoria', 'Cape Town',
				],
			};
			this.currentPlace = {'hemisphere': 'N', 'city': 'Townsville'};
			this.cities.N = this.shuffle(this.cities.N.slice());
			this.cities.S = this.shuffle(this.cities.S.slice());
			this.indexes = {'N': 0, 'S': 0};

			// We choose a hemisphere and city to be in at the beginning
			if (this.randomChance(1, 2)) this.currentPlace.hemisphere = 'S';
			this.currentPlace.city = this.cities[this.currentPlace.hemisphere][0];
			this.indexes[this.currentPlace.hemisphere]++;
		},
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				// Snarky comments from one trainer to another
				let comments = [
					"I've heard your mom is also travelling around the world catchin' em all, if you get what I mean, %s.",
					"You fight like a Miltank!", "I'm your Stealth Rock to your Charizard, %s!",
					"I bet I could beat you with a Spinda. Or an Unown.", "I'm rubber, you're glue!",
					"I've seen Slowpokes with more training prowess, %s.", "You are no match for me, %s!",
					"%s, have you learned how to battle from Bianca?",
				];
				let otherTrainer = (pokemon.side.id === 'p1') ? 'p2' : 'p1';
				this.add('-message', pokemon.side.name + ': ' + this.sampleNoReplace(comments).replace('%s', this[otherTrainer].name));
			}

			// This is the stuff that is calculated every turn once
			if (!this.lastMoveTurn) this.lastMoveTurn = 0;
			if (this.lastMoveTurn !== this.turn) {
				let nextChange = this.random(2, 4);
				if (this.lastMoveTurn === 0 || this.lastMoveTurn + nextChange <= this.turn) {
					this.lastMoveTurn = this.turn;
					if (this.randomChance(1, 2)) {
						if (this.currentPlace.hemisphere === 'N') {
							this.currentPlace.hemisphere = 'S';
							this.add('-fieldstart', 'move: Wonder Room', '[of] Seasonal');
						} else {
							this.currentPlace.hemisphere = 'N';
							this.add('-fieldend', 'move: Wonder Room', '[of] Seasonal');
						}
					}

					// Let's check if there's cities to visit left
					if (this.indexes.N === this.cities['N'].length - 1 &&
						this.indexes.S === this.cities['S'].length - 1) {
						this.add('-message', "You have travelled all around the world, " + pokemon.side.name + "! You won!");
						pokemon.battle.win(pokemon.side.id);
						return false;
					}
					// Otherwise, move to the next city
					this.currentPlace.city = this.cities[this.currentPlace.hemisphere][this.indexes[this.currentPlace.hemisphere]];
					this.indexes[this.currentPlace.hemisphere]++;
					let hemispheres = {'N': 'northern', 'S': 'southern'};
					this.add('-message', "Travelling around the world, you have arrived to a new city in the " + hemispheres[this.currentPlace.hemisphere] + " hemisphere, " + this.currentPlace.city + "!");
				}
			}
		},
		onModifyMove(move) {
			if (move.id === 'fireblast') move.name = 'July 4th Fireworks';
		},
	},
	{
		name: "[Seasonal] Average August",
		mod: 'gen5',

		team: 'randomSeasonalAA',
		gameType: 'doubles',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		shipNames: [
			'Zarelrules', 'Joimawesome', 'Treeckonoob', 'MJailBait', 'mikelpuns', 'TTTtttttt', 'Frazzle Dazzle',
			'TIbot', 'CDXCIV', 'Srs Bsns Trts', 'Leemz', 'Eggymad', 'Snoffles', 'bmelted', 'Poopes', 'Hugonedugen',
			'Il Haunter', 'chaospwns', 'WaterBro', 'niggie', 'DOOM', 'qhore', 'Jizzmine', 'Aldarown',
		],
		onBegin() {
			// What does player 1 lead with?
			let p1Where = 'boat';
			let p2Where = 'boat';
			if (this.p1.pokemon[0].name === 'Kyogre') p1Where = 'pirates';
			if (this.p2.pokemon[0].name === 'Kyogre') p2Where = 'pirates';
			let ships = this.getFormat().shipNames;
			let shipName = `S. S. ${ships[Math.floor(Math.random() * ships.length)]}`;
			let whereAreThey = (p1Where === 'boat' && p2Where === 'boat') ? 'You both were aboard the fantastic ship ' + shipName :
				((p1Where === 'pirates' && p2Where === 'pirates') ? 'You are two pirate gangs on a summer sea storm about to raze the ship ' + shipName :
					((p1Where === 'pirates') ? this.p1.name : this.p2.name) + ' leads a pirate boat to raze the ship ' + shipName +
			' where ' + ((p1Where === 'pirates') ? this.p2.name : this.p1.name)) + ' is enjoying a sea travel,';

			this.add('-message',
				'Alas, poor trainers! ' + whereAreThey + " when a sudden summer Hurricane made a Wailord hit your transport, and now it's sinking! " +
				"There are not enough life boats for everyone nor trainers ain't sharing their Water-type friends, " +
				"so you'll have to fight to access a life boat! Good luck! You have to be fast to not to be hit by the Hurricane!"
			);
		},
		onSwitchIn() {
			if (!this.turn) return;
			let notifyActivate = false;
			let allActives = this.p1.active.concat(this.p2.active);
			for (let pokemon of allActives) {
				if (!pokemon) continue;
				if (!pokemon.volatiles['perishsong']) {
					notifyActivate = true;
				}
				if (!pokemon.hasAbility('soundproof')) {
					pokemon.addVolatile('perishsong');
				} else {
					this.add('-immune', pokemon, '[msg]');
					this.add('-end', pokemon, 'Perish Song');
				}
			}

			if (notifyActivate) {
				this.add('-fieldactivate', 'move: Perish Song');
			}
		},
	},
	{
		name: "[Seasonal] School Schemes",
		mod: 'gen5',

		team: 'randomSeasonalSS',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
	},
	{
		name: "[Seasonal] Octoberfest",

		mod: 'gen5',
		team: 'randomSeasonalOF',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],

		onModifyMove(move) {
			if (move.id === 'trick') {
				delete move.onHit;
				switch (this.random(17)) {
				case 0:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Kick on the nuts!');
					};
					move.category = 'Physical';
					move.type = 'Normal';
					move.basePower = 200;
					break;
				case 1:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Fireworks at your feet!');
					};
					move.category = 'Special';
					move.type = 'Fire';
					move.basePower = 200;
					break;
				case 2:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Doused with water!');
					};
					move.category = 'Special';
					move.type = 'Water';
					move.basePower = 200;
					break;
				case 3:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Bombed with rotten eggs!');
					};
					move.category = 'Special';
					move.type = 'Poison';
					move.basePower = 200;
					break;
				case 4:
					move.onTryHit = function () {
						this.add('-message', 'Trick: You got scared by a real-looking costume!');
					};
					move.category = 'Special';
					move.type = 'Dark';
					move.basePower = 200;
					break;
				case 5:
					move.onTryHit = function () {
						this.add('-message', 'Trick: You got hit in the head!');
					};
					move.volatileStatus = 'confusion';
					break;
				case 6:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Your arms were maimed!');
					};
					move.volatileStatus = 'disable';
					break;
				case 7:
					move.onTryHit = function () {
						this.add('-message', "Trick: You've been taunted by those meddling kids!");
					};
					move.volatileStatus = 'taunt';
					break;
				case 8:
					move.onTryHit = function () {
						this.add('-message', 'Treat: You got some yummy seeds!');
					};
					move.volatileStatus = 'leechseed';
					break;
				case 9:
					move.onTryHit = function () {
						this.add('-message', 'Trick: Your car was stolen!');
					};
					move.volatileStatus = 'embargo';
					break;
				case 10:
					move.onTryHit = function () {
						this.add('-message', "Trick: You're haunted and you're going to die!");
					};
					move.volatileStatus = 'perishsong';
					break;
				case 11:
					move.onTryHit = function () {
						this.add('-message', 'Trick: A ghost cursed you!');
					};
					move.volatileStatus = 'curse';
					break;
				case 12:
					move.onTryHit = function () {
						this.add('-message', "Trick: You're tormented by the constant tricking!");
					};
					move.volatileStatus = 'torment';
					break;
				case 13:
					move.onTryHit = function () {
						this.add('-message', 'Treat: Om nom nom roots!');
					};
					move.volatileStatus = 'ingrain';
					break;
				case 14: {
					move.onTryHit = function () {
						this.add('-message', 'Treat: Uhm, these candy taste weird...');
					};

					let possibleBoosts = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy']; // Respect Evasion Clause
					let boosts = {
						[this.sampleNoReplace(possibleBoosts)]: 1,
						[this.sampleNoReplace(possibleBoosts)]: -1,
						[this.sampleNoReplace(possibleBoosts)]: -1,
					};
					move.boosts = boosts;
					break;
				}
				case 15:
					move.onTryHit = function () {
						this.add('-message', "Trick: You're tired of running after teenagers with your baseball bat.");
					};
					move.volatileStatus = 'mustrecharge';
					break;
				case 16:
					move.onTryHit = function () {
						this.add('-message', "Treat: You got candy!");
					};
					move.heal = [1, 2];
					break;
				}
			} else if (move.id === 'present' && this.randomChance(3, 10)) {
				move.accuracy = 55;
				move.basePower = 0;
				move.category = 'Status';
				move.status = 'slp';
				move.heal = null;
				move.name = 'Sing';
				move.flags = Object.assign({}, this.getMove('sing').flags);
			} else if (move.id === 'present') {
				move.accuracy = 100;
				move.basePower = 0;
				move.category = 'Status';
				move.volatileStatus = 'confusion';
				move.pp = 10;
				move.priority = 0;
				move.name = 'Offer Beer';
				move.boosts = {'atk': -1, 'spa': -1, 'def': 1, 'spd': 1, 'spe': -1, 'accuracy': -1, 'evasion': 1};
				move.onTryHit = function () {
					this.add('-message', "Oh, why, thank you! This beer is delicious!");
				};
			}
		},
	},
	// Thankless Thanksgiving, November 2013
	{
		name: "[Seasonal] Thankless Thanksgiving",
		mod: 'gen6',

		team: 'randomSeasonalTT',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
	},
	// Christmas Charade, December 2013
	{
		name: "[Seasonal] Christmas Charade",
		mod: 'gen6',

		team: 'randomSeasonalCC',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onBegin() {
			this.setWeather('Hail');
			delete this.weatherData.duration;
		},
		onModifyMove(move) {
			if (move.id === 'present') {
				move.category = 'Status';
				move.basePower = 0;
				delete move.heal;
				move.accuracy = 100;
				switch (this.random(19)) {
				case 0:
					move.onTryHit = function () {
						this.add('-message', "The present was a bomb!");
					};
					move.category = 'Physical';
					move.basePower = 250;
					break;
				case 1:
					move.onTryHit = function () {
						this.add('-message', "The present was confusion!");
					};
					move.volatileStatus = 'confusion';
					break;
				case 2:
					move.onTryHit = function () {
						this.add('-message', "The present was Disable!");
					};
					move.volatileStatus = 'disable';
					break;
				case 3:
					move.onTryHit = function () {
						this.add('-message', "The present was a taunt!");
					};
					move.volatileStatus = 'taunt';
					break;
				case 4:
					move.onTryHit = function () {
						this.add('-message', "The present was some seeds!");
					};
					move.volatileStatus = 'leechseed';
					break;
				case 5:
					move.onTryHit = function () {
						this.add('-message', "The present was an embargo!");
					};
					move.volatileStatus = 'embargo';
					break;
				case 6:
					move.onTryHit = function () {
						this.add('-message', "The present was a music box!");
					};
					move.volatileStatus = 'perishsong';
					break;
				case 7:
					move.onTryHit = function () {
						this.add('-message', "The present was a curse!");
					};
					move.volatileStatus = 'curse';
					break;
				case 8:
					move.onTryHit = function () {
						this.add('-message', "The present was Torment!");
					};
					move.volatileStatus = 'torment';
					break;
				case 9:
					move.onTryHit = function () {
						this.add('-message', "The present was a trap!");
					};
					move.volatileStatus = 'partiallytrapped';
					break;
				case 10:
					move.onTryHit = function () {
						this.add('-message', "The present was a root!");
					};
					move.volatileStatus = 'ingrain';
					break;
				case 11: {
					move.onTryHit = function () {
						this.add('-message', "The present was a makeover!");
					};

					let possibleBoosts = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy']; // Respect Evasion Clause
					let boosts = {
						[this.sampleNoReplace(possibleBoosts)]: 1,
						[this.sampleNoReplace(possibleBoosts)]: -1,
						[this.sampleNoReplace(possibleBoosts)]: -1,
					};
					move.boosts = boosts;
					break;
				}
				case 12:
					move.onTryHit = function () {
						this.add('-message', "The present was psychic powers!");
					};
					move.volatileStatus = 'telekinesis';
					break;
				case 13:
					move.onTryHit = function () {
						this.add('-message', "The present was fatigue!");
					};
					move.volatileStatus = 'mustrecharge';
					break;
				case 14:
				case 15:
					move.onTryHit = function () {
						this.add('-message', "The present was a snowball hit!");
					};
					move.category = 'Ice';
					move.basePower = 250;
					break;
				case 16:
					move.onTryHit = function () {
						this.add('-message', "The present was a crafty shield!");
					};
					move.volatileStatus = 'craftyshield';
					break;
				case 17:
					move.onTryHit = function () {
						this.add('-message', "The present was an electrification!");
					};
					move.volatileStatus = 'electrify';
					break;
				case 18:
					move.onTryHit = function () {
						this.add('-message', "The present was an ion deluge!");
					};
					move.volatileStatus = 'iondeluge';
					break;
				}
			}
		},
	},
];
