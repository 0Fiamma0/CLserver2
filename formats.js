/**
 * Seasonal Ladders of Pokémon Showdown
 * The formats with the mod-like tweaks go into /config/formats.js
 * The team making scripts go into /data/scripts.js
 *
 * THIS IS A BACKUP FILE.
 */

'use strict';

exports.Formats = [
	// Seasoning Greetings, November 2012
	{
		section: "OM of the Month",
	},
	{
		name: "[Seasonal] Seasoning's Greetings",

		team: 'randomSeasonal',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause'],
	},
	// Winter Wonderland, December 2012 and January 2013
	{
		name: "[Seasonal] Winter Wonderland",

		team: 'randomSeasonalWW',
		onBegin: function () {
			this.setWeather('Hail');
			delete this.weatherData.duration;
		},
		onModifyMove: function (move) {
			if (move.id === 'present') {
				move.category = 'Status';
				move.basePower = 0;
				delete move.heal;
				move.accuracy = 100;
				switch (this.random(20)) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
					move.onTryHit = function () {
						this.add('-message', "The present was a bomb!");
					};
					move.category = 'Physical';
					move.basePower = 200;
					break;
				case 5:
					move.onTryHit = function () {
						this.add('-message', "The present was confusion!");
					};
					move.volatileStatus = 'confusion';
					break;
				case 6:
					move.onTryHit = function () {
						this.add('-message', "The present was Disable!");
					};
					move.volatileStatus = 'disable';
					break;
				case 7:
					move.onTryHit = function () {
						this.add('-message', "The present was a taunt!");
					};
					move.volatileStatus = 'taunt';
					break;
				case 8:
					move.onTryHit = function () {
						this.add('-message', "The present was some seeds!");
					};
					move.volatileStatus = 'leechseed';
					break;
				case 9:
					move.onTryHit = function () {
						this.add('-message', "The present was an embargo!");
					};
					move.volatileStatus = 'embargo';
					break;
				case 10:
					move.onTryHit = function () {
						this.add('-message', "The present was a music box!");
					};
					move.volatileStatus = 'perishsong';
					break;
				case 11:
					move.onTryHit = function () {
						this.add('-message', "The present was a curse!");
					};
					move.volatileStatus = 'curse';
					break;
				case 12:
					move.onTryHit = function () {
						this.add('-message', "The present was Torment!");
					};
					move.volatileStatus = 'torment';
					break;
				case 13:
					move.onTryHit = function () {
						this.add('-message', "The present was a trap!");
					};
					move.volatileStatus = 'partiallytrapped';
					break;
				case 14:
					move.onTryHit = function () {
						this.add('-message', "The present was a root!");
					};
					move.volatileStatus = 'ingrain';
					break;
				case 15:
				case 16:
				case 17: {
					move.onTryHit = function () {
						this.add('-message', "The present was a makeover!");
					};

					let boosts = {};
					let possibleBoosts = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy'].randomize();
					boosts[possibleBoosts[0]] = 1;
					boosts[possibleBoosts[1]] = -1;
					boosts[possibleBoosts[2]] = -1;
					move.boosts = boosts;
					break;
				}
				case 18:
					move.onTryHit = function () {
						this.add('-message', "The present was psychic powers!");
					};
					move.volatileStatus = 'telekinesis';
					break;
				case 19:
					move.onTryHit = function () {
						this.add('-message', "The present was fatigue!");
					};
					move.volatileStatus = 'mustrecharge';
					break;
				}
			}
		},
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause'],
	},
	// Valentine Venture, February 2013
	{
		name: "[Seasonal] Valentine Venture",

		team: 'randomSeasonalVV',
		gameType: 'doubles',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause'],
	},
	// Spring Forward, March 2013
	{
		name: "[Seasonal] Spring Forward",

		team: 'randomSeasonalSF',
		onBegin: function () {
			if (this.random(100) < 75) {
				this.add('-message', "March and April showers bring May flowers...");
				this.setWeather('Rain Dance');
				delete this.weatherData.duration;
			}
			this.debug('Cutting teams down to three.');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		onSwitchIn: function (pokemon) {
			let greenPokemon = {
				bulbasaur:1, ivysaur:1, venusaur:1, caterpie:1, metapod:1, bellsprout:1, weepinbell:1, victreebel:1, scyther:1,
				chikorita:1, bayleef:1, meganium:1, spinarak:1, natu:1, xatu:1, bellossom:1, politoed:1, skiploom:1, lavitar:1,
				tyranitar:1, celebi:1, treecko:1, grovyle:1, sceptile:1, dustox:1, lotad:1, lombre:1, ludicolo:1, breloom:1,
				electrike:1, roselia:1, gulpin:1, vibrava:1, flygon:1, cacnea:1, cacturne:1, cradily:1, keckleon:1, tropius:1,
				rayquaza:1, turtwig:1, grotle:1, torterra:1, budew:1, roserade:1, carnivine:1, yanmega:1, leafeon:1, shaymin:1,
				shayminsky:1, snivy:1, servine:1, serperior:1, pansage:1, simisage:1, swadloon:1, cottonee:1, whimsicott:1,
				petilil:1, lilligant:1, basculin:1, maractus:1, trubbish:1, garbodor:1, solosis:1, duosion:1, reuniclus:1,
				axew:1, fraxure:1, golett:1, golurk:1, virizion:1, tornadus:1, tornadustherian:1, burmy:1,
				kakuna:1, beedrill:1, sandshrew:1, nidoqueen:1, zubat:1, golbat:1, oddish:1, gloom:1, mankey:1, poliwrath:1,
				machoke:1, machamp:1, doduo:1, dodrio:1, grimer:1, muk:1, kingler:1, cubone:1, marowak:1, hitmonlee:1, tangela:1,
				mrmime:1, tauros:1, kabuto:1, dragonite:1, mewtwo:1, marill:1, hoppip:1, espeon:1, teddiursa:1, ursaring:1,
				cascoon:1, taillow:1, swellow:1, pelipper:1, masquerain:1, azurill:1, minun:1, carvanha:1, huntail:1, bagon:1,
				shelgon:1, salamence:1, latios:1, tangrowth:1, seismitoad:1, jellicent:1, elektross:1, druddigon:1,
				bronzor:1, bronzong:1, gallade:1,
			};
			if (pokemon.template.id in greenPokemon) {
				this.add('-message', pokemon.name + " drank way too much!");
				pokemon.addVolatile('confusion');
				pokemon.statusData.time = 0;
			}
		},
		onModifyMove: function (move) {
			if (move.id === 'barrage') {
				move.category = 'Special';
				move.type = 'Grass';
				move.basePower = 35;
				move.critRatio = 2;
				move.accuracy = 100;
				move.multihit = [3, 5];
				move.onBeforeMove = function () {
					this.add('-message', "You found a little chocolate egg!");
				};
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
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause'],
	},
	// Fools Festival, April 2013
	{
		name: "[Seasonal] Fools Festival",

		team: 'randomSeasonalFF',
		onBegin: function () {
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
		onSwitchIn: function (pokemon) {
			let name = (pokemon.ability === 'illusion' && pokemon.illusion) ? pokemon.illusion.toString().substr(4, pokemon.illusion.toString().length) : pokemon.name;
			let stonedPokemon = {Koffing:1, Weezing:1, Slowpoke:1, Slowbro:1, Slowking:1, Psyduck:1, Spinda:1};
			let stonerQuotes = ['your face is green!', 'I just realised that Arceus fainted for our sins', 'I can, you know, feel the colors',
				"you're my bro", "I'm imaginining a new color!", "I'm smelling the things I see!", 'hehe, hehe, funny', "I'm hungry!", 'we are pokemanz',
				'Did you know that Eevee backwards is eevee?! AMAZING', 'aaaam gonna be the verrrry best like no one evar wasss',
				"I feel like someone is watching us through a screen!", "come at me bro"];
			if (name in stonedPokemon) {
				let random = this.random(stonerQuotes.length);
				this.add('-message', name + ": Duuuuuude, " + stonerQuotes[random]);
				this.boost({spe:-1, def:1, spd:1}, pokemon, pokemon, {fullname:'high'});
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
				didYouHear = didYouHear.randomize();
				msg = 'Did you hear? ' + didYouHear[0];
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
		onModifyMove: function (move) {
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
					let name = (target.ability === 'illusion' && target.illusion) ? target.illusion.toString().substr(4, target.illusion.toString().length) : target.name;
					this.add('-message', name + ': Do you even lift, bro?!');
				};
			} else if (move.id === 'charm' || move.id === 'sweetkiss' || move.id === 'attract') {
				let malePickUpLines = ['have you been to Fukushima recently? Because you are glowing tonight!',
					'did it hurt when you fell to the earth? Because you must be an angel!', 'can I buy you a drink?',
					'roses are red / lemons are sour / spread your legs / and give me an hour',
					"roses are red / violets are red / I'm not good with colors", "Let's go watch cherry bossoms together (´･ω･`)",
					"Will you be my Denko? (´･ω･`)"];
				malePickUpLines = malePickUpLines.randomize();
				let femalePickUpLines = ['Do you go to the gym? You are buff!', "Guy, you make me hotter than July.",
					"While I stare at you I feel like I just peed myself", "Let's go to my apartment to have midnight coffee",
					"Marry me, I wanna have 10 kids of you!", "Go out with me or I'll twist your neck!", "Man, you have some nice abs, can I touch them?"];
				femalePickUpLines = femalePickUpLines.randomize();
				move.onTryHit = function (target, source, move) {
					let pickUpLine = '';
					if (source.gender === 'M') {
						pickUpLine = malePickUpLines[0];
					} else if (source.gender === 'F') {
						pickUpLine = femalePickUpLines[0];
					} else {
						return;
					}
					let name = (source.ability === 'illusion' && source.illusion) ? source.illusion.toString().substr(4, source.illusion.toString().length) : source.name;
					let targetName = (target.ability === 'illusion' && target.illusion) ? target.illusion.toString().substr(4, target.illusion.toString().length) : target.name;
					this.add('-message', name + ': Hey, ' + targetName + ', ' + pickUpLine);
				};
				move.onMoveFail = function (target, source, move) {
					// Returns false so move calls onHit and onMoveFail
					let femaleRejectLines = ['Uuuh... how about no', "gtfo I'm taken", 'I have to water the plants. On Easter Island. For a year. Bye',
						'GO AWAY CREEP', 'Do you smell like rotten eggs?', "I wouldn't date you even if you were the last Pokemon on earth."];
					femaleRejectLines = femaleRejectLines.randomize();
					let maleRejectLines = ["I'd rather get it on with a dirty daycare Ditto", "I'm not realy sure you're clean",
						"Ew, you're disgusting!", "It's not me, it's you. Go away, ugly duckling.", "Not really interested *cough*weirdo*cough*"];
					maleRejectLines = maleRejectLines.randomize();
					let answer = '';
					if (target.gender === 'M') {
						answer = maleRejectLines[0];
					} else if (target.gender === 'F') {
						answer = femaleRejectLines[0];
					} else {
						return;
					}
					let targetName = (target.ability === 'illusion' && target.illusion) ? target.illusion.toString().substr(4, target.illusion.toString().length) : target.name;
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
					let sourceName = (source.ability === 'illusion' && source.illusion) ? source.illusion.toString().substr(4, source.illusion.toString().length) : source.name;
					this.add('-message', sourceName + ' said, "' + quotes.sample() + '"');
				};
			}
		},
		onFaint: function (pokemon) {
			// A poem every time a Pokemon faints
			let haikus = ["You suck a lot / You are a bad trainer / let a mon faint", "they see me driving / round town with the girl i love / and I'm like, haikou",
				"Ain't no Pokemon tough enough / ain't no bulk decent enough / ain't no recovery good enough / to keep me from fainting you, babe",
				"Roses are red / violets are blue / you must be on some med / 'coz as a trainer you suck",
				"You're gonna be the very worst / like no one ever was / to lose all the battles is your test / to faint them all is your cause",
				'Twinkle twinkle little star / fuck you that was my best sweeper', "I'm wheezy and I'm sleezy / but as a trainer you're measly",
				"You're sharp as a rock / you're bright as a hole / you're one to mock / you could be beaten by a maimed mole",
				"Alas, poor trainer! I knew him, your Pokémon, a fellow of infinite jest, of most excellent fancy."];
			haikus = haikus.randomize();
			this.add('-message', haikus[0]);
		},
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause'],
	},
	{
		name: "[Seasonal] May Mayhem",

		team: 'randomSeasonalMM',
		onBegin: function () {
			// Shameless plug
			let date = Date();
			date = date.split(' ');
			if (parseInt(date[2]) === 12) {
				this.add('-message', 'Wish a HAPPY BIRTHDAY to Treecko32!!');
			}
			if (parseInt(date[2]) === 16) {
				this.add('-message', 'Wish a HAPPY BIRTHDAY to Joim!!');
			}
		},
		onSwitchIn: function (pokemon) {
			let dice = this.random(100);
			if (dice < 25) {
				this.add('-message', 'Never gonna give you up, never gonna let you down');
			}
		},
	},
	{
		name: "[Seasonal] June Jubilee",

		team: 'randomSeasonalJJ',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('-message', "Greetings, trainer! Delibird needs your help! It's lost in the US and it needs to find its way back to the arctic before summer starts! Help your Delibird while travelling north, but you must defeat the opponent before he reaches there first!");
			this.setWeather('Sunny Day');
			delete this.weatherData.duration;
		},
		onBeforeMove: function (pokemon, target, move) {
			// Reshiram changes weather with its tail until you reach the arctic
			if (pokemon.template.speciesid === 'reshiram' && pokemon.side.battle.turn < 15) {
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

			if (!pokemon.side.battle.seasonal) pokemon.side.battle.seasonal = {'none':false, 'drizzle':false, 'hail':false};
			if (pokemon.side.battle.turn >= 4 && pokemon.side.battle.seasonal.none === false) {
				this.add('-message', "You are travelling north and you have arrived to North Dakota! There's a clear sky and the temperature is lower here.");
				this.clearWeather();
				pokemon.side.battle.seasonal.none = true;
			}
			if (pokemon.side.battle.turn >= 8 && pokemon.side.battle.seasonal.drizzle === false) {
				this.add('-message', "You are travelling further north and you have arrived to Edmonton! It started raining a lot... and it's effing cold.");
				this.setWeather('Rain Dance');
				delete this.weatherData.duration;
				pokemon.side.battle.seasonal.drizzle = true;
			}
			if (pokemon.side.battle.turn >= 12 && pokemon.side.battle.seasonal.hail === false) {
				this.add('-message', "You have arrived to the arctic! Defeat the other trainer so Delibird can be free!");
				this.setWeather('Hail');
				delete this.weatherData.duration;
				pokemon.side.battle.seasonal.hail = true;
			}
		},
		onFaint: function (pokemon) {
			if (pokemon.template.id === 'delibird') {
				let name = pokemon.side.name;
				let winner = '';
				if (pokemon.side.id === 'p1') {
					winner = 'p2';
				} else {
					winner = 'p1';
				}
				this.add('-message', "No!! You let Delibird down. He trusted you. You lost the battle, " + name + ". But you lost something else: your Pokémon's trust.");
				pokemon.battle.win(winner);
			}
		},
	},
	{
		name: "[Seasonal] Jolly July",

		team: 'randomSeasonalJuly',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('-message', "You and your faithful favourite Pokémon are travelling around the world, and you will fight this trainer in many places until either win or finish the travel!");
			// ~learn international independence days with PS~
			let date = Date();
			date = date.split(' ');
			switch (parseInt(date[2])) {
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
				// Bahamas lol
				this.add('-message', "Free the beaches!");
				break;
			case 20:
				// Colombia
				this.add('-message', "¡Independencia para Colombia!");
				break;
			case 28:
				// Perú
				this.add('-message', "¡Perú libre!");
				break;
			}
		},
		onBeforeMove: function (pokemon) {
			// Set all the stuff
			let dice = this.random(100);
			if (!pokemon.side.battle.cities) {
				// Set up the cities you visit around the world
				pokemon.side.battle.cities = {
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
				pokemon.side.battle.currentPlace = {'hemisphere':'N', 'city':'Townsville'};
				pokemon.side.battle.cities.N = pokemon.side.battle.cities.N.randomize();
				pokemon.side.battle.cities.S = pokemon.side.battle.cities.S.randomize();
				pokemon.side.battle.indexes = {'N':0, 'S':0};
				// We choose a hemisphere and city to be in at the beginning
				if (dice < 50) pokemon.side.battle.currentPlace.hemisphere = 'S';
				pokemon.side.battle.currentPlace.city = pokemon.side.battle.cities[pokemon.side.battle.currentPlace.hemisphere][0];
				pokemon.side.battle.indexes[pokemon.side.battle.currentPlace.hemisphere]++;
			}

			// Snarky comments from one trainer to another
			let diceTwo = this.random(100);
			if (diceTwo > 75) {
				let comments = [
					"I've heard your mom is also travelling around the world catchin' em all, if you get what I mean, %s.",
					"You fight like a Miltank!", "I'm your Stealth Rock to your Charizard, %s!",
					"I bet I could beat you with a Spinda. Or an Unown.", "I'm rubber, you're glue!",
					"I've seen Slowpokes with more training prowess, %s.", "You are no match for me, %s!",
					"%s, have you learned how to battle from Bianca?",
				];
				comments = comments.randomize();
				let otherTrainer = (pokemon.side.id === 'p1') ? 'p2' : 'p1';
				this.add('-message', pokemon.side.name + ': ' + comments[0].replace('%s', pokemon.side.battle[otherTrainer].name));
			}

			// This is the stuff that is calculated every turn once
			if (!pokemon.side.battle.lastMoveTurn) pokemon.side.battle.lastMoveTurn = 0;
			if (pokemon.side.battle.lastMoveTurn !== pokemon.side.battle.turn) {
				let nextChange = this.random(2, 4);
				if (pokemon.side.battle.lastMoveTurn === 0 || pokemon.side.battle.lastMoveTurn + nextChange <= pokemon.side.battle.turn) {
					pokemon.side.battle.lastMoveTurn = pokemon.side.battle.turn;
					if (dice < 50) {
						if (pokemon.side.battle.currentPlace.hemisphere === 'N') {
							pokemon.side.battle.currentPlace.hemisphere = 'S';
							this.add('-fieldstart', 'move: Wonder Room', '[of] Seasonal');
						} else {
							pokemon.side.battle.currentPlace.hemisphere = 'N';
							this.add('-fieldend', 'move: Wonder Room', '[of] Seasonal');
						}
					}

					// Let's check if there's cities to visit left
					if (pokemon.side.battle.indexes.N === pokemon.side.battle.cities['N'].length - 1 &&
						pokemon.side.battle.indexes.S === pokemon.side.battle.cities['S'].length - 1) {
						this.add('-message', "You have travelled all around the world, " + pokemon.side.name + "! You won!");
						pokemon.battle.win(pokemon.side.id);
						return false;
					}
					// Otherwise, move to the next city
					pokemon.side.battle.currentPlace.city = pokemon.side.battle.cities[pokemon.side.battle.currentPlace.hemisphere][pokemon.side.battle.indexes[pokemon.side.battle.currentPlace.hemisphere]];
					pokemon.side.battle.indexes[pokemon.side.battle.currentPlace.hemisphere]++;
					let hemispheres = {'N':'northern', 'S':'southern'};
					pokemon.side.battle.add('-message', "Travelling around the world, you have arrived to a new city in the " + hemispheres[pokemon.side.battle.currentPlace.hemisphere] + " hemisphere, " + pokemon.side.battle.currentPlace.city + "!");
				}
			}
		},
		onModifyMove: function (move) {
			if (move.id === 'fireblast') move.name = 'July 4th Fireworks';
		},
	},
	{
		name: "[Seasonal] Average August",

		team: 'randomSeasonalAA',
		gameType: 'doubles',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			// What does player 1 lead with?
			let p1Where = 'boat';
			let p2Where = 'boat';
			if (this.p1.pokemon[0].name === 'Kyogre') p1Where = 'pirates';
			if (this.p2.pokemon[0].name === 'Kyogre') p2Where = 'pirates';
			let shipNames = [
				'Zarelrules', 'Joimawesome', 'Treeckonoob', 'MJailBait', 'mikelpuns', 'TTTtttttt', 'Frazzle Dazzle',
				'TIbot', 'CDXCIV', 'Srs Bsns Trts', 'Leemz', 'Eggymad', 'Snoffles', 'bmelted', 'Poopes', 'Hugonedugen',
				'Il Haunter', 'chaospwns', 'WaterBro', 'niggie', 'DOOM', 'qhore', 'Jizzmine', 'Aldarown',
			].randomize();
			let whereAreThey = (p1Where === 'boat' && p2Where === 'boat') ? 'You both were aboard the fantastic ship S. S. ' + shipNames[0] :
			((p1Where === 'pirates' && p2Where === 'pirates') ? 'You are two pirate gangs on a summer sea storm about to raze the ship S. S. ' + shipNames[0] :
			((p1Where === 'pirates') ? this.p1.name : this.p2.name) + ' leads a pirate boat to raze the ship S. S. ' + shipNames[0] +
			' where ' + ((p1Where === 'pirates') ? this.p2.name : this.p1.name)) + ' is enjoying a sea travel,';

			this.add('-message',
				'Alas, poor trainers! ' + whereAreThey + " when a sudden summer Hurricane made a Wailord hit your transport, and now it's sinking! " +
				"There are not enough life boats for everyone nor trainers ain't sharing their Water-type friends, " +
				"so you'll have to fight to access a life boat! Good luck! You have to be fast to not to be hit by the Hurricane!"
			);
		},
		onSwitchIn: function (pokemon) {
			if (pokemon.battle.turn > 0) {
				let result = true;
				for (let i = 0; i < pokemon.battle.sides.length; i++) {
					for (let j = 0; j < pokemon.battle.sides[i].active.length; j++) {
						if (pokemon.battle.sides[i].active[j] && !pokemon.battle.sides[i].active[j].volatiles['perishsong']) {
							result = false;
						}
						if (pokemon.battle.sides[i].active[j] && pokemon.battle.sides[i].active[j].ability !== 'soundproof') {
							pokemon.battle.sides[i].active[j].addVolatile('perishsong');
						} else {
							this.add('-immune', pokemon.battle.sides[i].active[j], '[msg]');
							this.add('-end', pokemon.battle.sides[i].active[j], 'Perish Song');
						}
					}
				}
				if (result) return false;
				this.add('-fieldactivate', 'move: Perish Song');
			}
		},
	},
	{
		name: "[Seasonal] School Schemes",

		team: 'randomSeasonalSS',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Seasonal] Octoberfest",

		mod: 'gen5',
		team: 'randomSeasonalOF',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onModifyMove: function (move) {
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
					let boosts = {};
					let possibleBoosts = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'].randomize();
					boosts[possibleBoosts[0]] = 2;
					boosts[possibleBoosts[1]] = -1;
					boosts[possibleBoosts[2]] = -1;
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
			} else if (move.id === 'present') {
				move.accuracy = 100;
				move.basePower = 0;
				move.category = 'Status';
				move.volatileStatus = 'confusion';
				move.pp = 10;
				move.priority = 0;
				move.name = 'Offer Beer';
				move.boosts = {'atk':-1, 'spa':-1, 'def':1, 'spd':1, 'spe':-1, 'accuracy':-1, 'evasion':1};
				move.onTryHit = function () {
					this.add('-message', "Oh, why, thank you! This beer is delicious!");
				};
				move.effect = {
					onBeforeMove: function (pokemon, target, move) {
						if (this.random(10) < 3) {
							this.useMove('Sing', target);
							return;
						}
					},
				};
			}
		},
	},
	// Thankless Thanksgiving, November 2013
	{
		name: "[Seasonal] Thankless Thanksgiving",

		team: 'randomSeasonalTT',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
	},
	// Christmas Charade, December 2013
	{
		name: "[Seasonal] Christmas Charade",

		team: 'randomSeasonalCC',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.setWeather('Hail');
			delete this.weatherData.duration;
		},
		onModifyMove: function (move) {
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
					let boosts = {};
					let possibleBoosts = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'].randomize();
					boosts[possibleBoosts[0]] = 1;
					boosts[possibleBoosts[1]] = -1;
					boosts[possibleBoosts[2]] = -1;
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
	// Winter's Wont, January 2014
	{
		name: "[Seasonal] Winter's Wont",

		gameType: 'doubles',
		team: 'randomSeasonalWinter',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		maxLevel: 1000,
		onBegin: function () {
			this.setWeather('Hail');
			delete this.weatherData.duration;
		},
		onModifyPokemon: function (pokemon) {
			pokemon.negateImmunity['Type'] = true;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
	},
	// Fabulous February, February 2014
	{
		name: "[Seasonal] Fabulous February",

		gameType: 'doubles',
		team: 'randomSeasonalFFY',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('-message', "新年快乐");
		},
		onModifyMove: function (move) {
			if (move.id === 'explosion') move.name = 'Firecrackers';
			else if (move.type === 'Fire') move.name = 'Fireworks';
		},
		onModifyPokemon: function (pokemon) {
			pokemon.negateImmunity['Type'] = true;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
	},
	{
		name: "[Seasonal] Strikes Back",

		gameType: 'triples',
		team: 'randomSeasonalSB',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('-message', "V4 is a big poo-poo!");
		},
		onModifyMove: function (move) {
			// Change present mechanics
			if (move.id === 'present') {
				move.category = 'Status';
				move.basePower = 0;
				delete move.heal;
				move.accuracy = 100;
				switch (this.random(16)) {
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
					let boosts = {};
					let possibleBoosts = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'].randomize();
					boosts[possibleBoosts[0]] = 1;
					boosts[possibleBoosts[1]] = -1;
					boosts[possibleBoosts[2]] = -1;
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
				}
			} else {
				// Change move type time to time only when the move is not present.
				if (this.random(100) < 35 && move.target !== 'self') {
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
					case 'poison':
						type = 'Fairy';
						break;
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
						type = 'Ghost';
						break;
					case 'psychic':
						type = 'Dark';
						break;
					case 'steel':
						type = 'Poison';
						break;
					case 'fairy':
						type = 'Dragon';
						break;
					}

					move.type = type;
					this.add('-message', 'LOL trolled I changed yer move type hahaha');
				}
			}
		},
		onSwitchIn: function (pokemon) {
			if (this.random(100) < 25) {
				this.add('-message', pokemon.name + " drank way too much!");
				pokemon.addVolatile('confusion');
				pokemon.statusData.time = 0;
			}
		},
		onFaint: function (pokemon) {
			// A poem every time a Pokemon faints
			let haikus = ["You suck a lot / You are a bad trainer / let a mon faint", "they see me driving / round town with the girl i love / and I'm like, haikou",
				"Ain't no Pokemon tough enough / ain't no bulk decent enough / ain't no recovery good enough / to keep me from fainting you, babe",
				"Roses are red / violets are blue / you must be on some med / 'coz as a trainer you suck",
				"You're gonna be the very worst / like no one ever was / to lose all the battles is your test / to faint them all is your cause",
				'Twinkle twinkle little star / screw you that was my best sweeper', "I'm wheezy and I'm sleezy / but as a trainer you're measly",
				"You're sharp as a rock / you're bright as a hole / you're one to mock / you could be beaten by a maimed mole",
				"Alas, poor trainer! I knew him, your Pokémon, a fellow of infinite jest, of most excellent fancy."];
			haikus = haikus.randomize();
			this.add('-message', haikus[0]);
		},
	},
	{
		name: "[Seasonal] Sleigh Showdown",

		team: 'randomSeasonalSleigh',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('-message', "Yikes! You are a grinch in a reckless, regretless sleigh race, running for Showdownville to ruin christmas. But, to achieve that, you must first defeat your opponent. Fight hard and take care with the obstacles!");
			this.seasonal = {position: [0, 0], weight: [2500, 2500]};
		},
		onModifyMove: function (move) {
			if (move.type === 'Fire') {
				move.onHit = function (pokemon, source) {
					this.add('-message', "The fire melts the snow, slowing down the sleigh!");
					this.boost({spe: -1}, pokemon, source);
				};
			}
			if (move.type === 'Water') {
				if (this.random(100) < 25) {
					this.add('-message', "The cold froze your Water-type attack, making it Ice-type instead!");
					move.type = 'Ice';
				}
			}
			if (move.type === 'Ice') {
				move.onHit = function (pokemon, source) {
					this.add('-message', "The ice makes the surface more slippery, speeding up the sleigh!");
					this.boost({spe: 1}, pokemon, source);
				};
			}
			if (move.id === 'present') {
				move.name = "Throw sack present";
				move.accuracy = 100;
				move.basePower = 0;
				move.category = "Status";
				move.heal = null;
				move.boosts = null;
				move.target = 'normal';
				move.status = null;
				move.type = "Normal";
				switch (this.random(9)) {
				case 0:
					move.onTryHit = function (target, source) {
						this.add('-message', "You got an Excadreydle from the sack!");
						this.seasonal.weight[source.side.n] -= 40.4;
					};
					move.boosts = {spe: -1};
					break;
				case 1:
					move.onTryHit = function (target, source) {
						this.add('-message', "You got a Chandelnukkiyah from the sack!");
						this.seasonal.weight[source.side.n] -= 34.3;
					};
					move.status = 'brn';
					break;
				case 2:
					move.onTryHit = function (target, source) {
						this.add('-message', "You got a Glalie from the sack! Ka-boom!");
						this.seasonal.weight[source.side.n] -= 256.5;
					};
					move.category = 'Special';
					move.basePower = 300;
					break;
				case 3:
					move.onTryHit = function (target, source) {
						this.add('-message', "You got a tree Starmie from the sack!");
						this.seasonal.weight[source.side.n] -= 80;
					};
					move.category = 'Special';
					move.type = 'Water';
					move.basePower = 150;
					break;
				case 4:
					move.onTryHit = function (target, source) {
						this.add('-message', "You got an Abomaxmas tree from the sack!");
						this.seasonal.weight[source.side.n] -= 40.4;
					};
					move.category = 'Physical';
					move.type = 'Ice';
					move.basePower = 150;
					break;
				case 5:
					move.onTryHit = function (target, source) {
						this.add('-message', "You got a Chansey egg nog from the sack!");
						this.seasonal.weight[source.side.n] -= 34.6;
					};
					move.target = 'self';
					move.heal = [3, 4];
					break;
				case 6:
					move.onTryHit = function (target, source) {
						this.add('-message', "You got Cryogonal snowflakes from the sack!");
						this.seasonal.weight[source.side.n] -= 148;
					};
					move.category = 'Special';
					move.type = 'Ice';
					move.basePower = 200;
					break;
				case 7:
					move.onTryHit = function (target, source) {
						this.add('-message', "You got Pikachu-powered christmas lights from the sack!");
						this.seasonal.weight[source.side.n] -= 6;
					};
					move.category = 'Special';
					move.type = 'Electric';
					move.basePower = 250;
					break;
				case 8:
					move.onTryHit = function (target, source) {
						this.add('-message', "You got Shaymin-Sky mistletoe from the sack!");
						this.seasonal.weight[source.side.n] -= 5.2;
					};
					move.category = 'Special';
					move.type = 'Grass';
					move.basePower = 200;
					break;
				}
			}
		},
		onBeforeMove: function (pokemon, target, move) {
			// Before every move, trainers advance on their sleighs. There might be obstacles.
			// We add more speed the less loaded the sleigh is.
			// Then, we get a random number from 0 to 99, then calculate if it's less than (Pokémon's speed * 0.083) + 5.
			let speed = Math.abs(pokemon.speed) + Math.ceil((2500 - this.seasonal.weight[pokemon.side.n]) / 25);
			if (this.random(100) < Math.ceil(speed * 0.083) + 5) {
				let name = pokemon.illusion ? pokemon.illusion.name : pokemon.name;
				// If an obstacle is found, the trainer won't advance this turn.
				switch (this.random(6)) {
				case 0:
				case 1:
				case 2:
					this.add('-message', "" + name + " hit a tree and some snow fell on it!");
					pokemon.cureStatus();
					this.damage(Math.ceil(pokemon.maxhp / 10), pokemon, pokemon, "head injuries", true);
					break;
				case 3:
					this.add('-message', "" + name + " hit a snow bank!");
					pokemon.setStatus('frz', pokemon, null, true);
					this.add('cant', pokemon, 'frz');
					return false;
				case 4:
					this.add('-message', "" + name + " fell into a traphole!");
					this.boost({spe: -1}, pokemon, pokemon, move);
					break;
				case 5:
					this.add('-message', "" + name + " hit a heavy wall!");
					// override status
					pokemon.setStatus('par', pokemon, null, true);
					break;
				}
			} else {
				// If no obstacles, the trainer advances as much meters as speed its Pokémon has.
				this.add('-message', "" + pokemon.side.name + " has advanced down the mountain " + speed + " meters!");
				this.seasonal.position[pokemon.side.n] += speed;
			}

			// Showdownville is about 4000 meters away from the mountaintop.
			if (this.seasonal.position[pokemon.side.n] >= 3500) {
				this.add('-message', "" + pokemon.side.name + " has arrived to Showdownville first and ruined christmas! The race is won!");
				this.win(pokemon.side.id);
			}
		},
		onHit: function (target) {
			// Getting hit thaws the ice if you are frozen.
			if (target.status === 'frz') target.cureStatus();
		},
	},
];
