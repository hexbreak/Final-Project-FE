const getState = ({ getStore, getActions, setStore }) => {
	const beURL = "https://3000-bronze-earwig-hbuagomx.ws-us03.gitpod.io"; // Use ${beURL} to make it easier when handling the BE's constant URL changes
	return {
		store: {
			user: {
				// Login, Registration, Username, UserType, UserId, Token, Validation\
				username: "99lalo",
				password: "5468",
				id: "1",
				about:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt molestie magna, at malesuada diam blandit in. Praesent elementum mi eget pellentesque porta. Mauris quis mi nulla. Nullam odio mi.",
				image: "https://cdn.pixabay.com/photo/2017/08/15/08/23/galaxy-2643089_960_720.jpg",
				favorites: [
					{ name: "The Elder Scrolls V: Skyrim", id: "5679" },
					{ name: "Terraria", id: "422" },
					{ name: "The Binding of Isaac: Afterbirth+", id: "23742" }
				],
				platforms: [
					{ name: "PC", id: "4" },
					{ name: "Playstation 4", id: "18" },
					{ name: "Nintendo Switch", id: "7" }
				],
				game_progression: {
					"4": {
						started: { name: "Skul: The Hero Slayer", id: "412477" },
						finished: { name: "Warhammer: Vermintide 2", id: "45969" },
						completed: { name: "Terraria", id: "422" }
					},
					"18": {
						started: { name: "God of War", id: "58175" },
						finished: null,
						completed: { name: "Borderlands 3", id: "58617" }
					},
					"7": {
						started: { name: "Super Mario Odyssey", id: "28026" },
						finished: { name: "Cuphead", id: "28154" },
						completed: { name: "Super Smash Bros. Ultimate", id: "58829" }
					}
				},
				playing: [
					{ name: "Curse of the Dead Gods", id: "387328", notes: "2 Stages Cleared!" },
					{ name: "Minecraft", id: "22509", notes: "Looking for Nether Fortress" }
				],
				tags: { liked: [{ id: "31", name: "Singleplayer" }], disliked: [{ id: "7", name: "Multiplayer" }] },
				preference: true
			},
			backlogPost: [],
			backlogGet: [],
			gameList: [],
			gameMetacriticList: [],
			gameRatingList: [],
			game: [],
			gameAchievements: [],
			gameTrailers: [],
			similarGamesList: [],
			sortedGameList: [],
			otherGamesList: [],
			dlcsList: [],
			gameTitle: [],
			favorites: [],
			tags: [],
			genres: [],
			platforms: [],
			addedByPlayers: [],
			searchBar: [],
			superSearch: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			// User Registration // incomplete code until JWT integration
			registerUser: user => {
				fetch(`${beURL}/user` + id, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(user)
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(response => {
						console.log("Success:", response);
						// return setStates in here to push data to BE
					})
					.catch(error => console.error("Error:", error));
			},
			// Login Account // incomplete code until JWT integration
			loginUser: user => {
				fetch(`${beURL}/user/` + id, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: username,
						password: password
					})
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(response => {
						console.log("Success:", response);
						// return setStates in here to push data to BE
					})
					.catch(error => console.error("Error:", error)); // BE RIGHT BACK <<<
			},
			backlogAdd: () => {
				const store = getStore();
				let gamePlat = store.game.platforms;
				const getPlatforms = platforms => {
					return platforms.map(gamePlat => gamePlat.platform.name).toString();
				};
				let gameTag = store.game.tags;
				const getTags = tag => {
					return tag.map(gameTag => gameTag.name).toString();
				};
				let gameGenre = store.game.genres;
				const getGenre = genre => {
					return genre.map(gameGenre => gameGenre.name).toString();
				};
				fetch(`${beURL}/user/1/backlog`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						game_id: store.game.id,
						game_name: store.game.name,
						game_platform: getPlatforms(gamePlat),
						game_genre: getGenre(gameGenre),
						game_tags: getTags(gameTag),
						game_notes: "notes",
						now_playing: false,
						progress_status: "PROGRESSING"
					})
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(response => {
						console.log("Success:", response);
						// Do stuff with the JSON
						// return setStore({ backlogPost: responseAsJson });
					})
					.catch(error => console.error("Error:", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			loadGameList: pageNumber => {
				fetch(`https://api.rawg.io/api/games?page=${pageNumber}`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ gameList: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadGame: gameId => {
				fetch(`https://api.rawg.io/api/games/${gameId}`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ game: responseAsJson });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadSortedGameList: (pageNumber, ordering) => {
				fetch(`https://api.rawg.io/api/games?ordering=${ordering}&page=${pageNumber}`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ sortedGameList: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadDlcs: gameId => {
				fetch(`https://api.rawg.io/api/games/${gameId}/additions`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ dlcsList: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadOtherGames: gameId => {
				fetch(`https://api.rawg.io/api/games/${gameId}/game-series`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ otherGamesList: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadSimilarGames: genreId => {
				if (genreId[1] != undefined) {
					fetch(`https://api.rawg.io/api/games?genres=${genreId[1]}`)
						.then(function(response) {
							if (!response.ok) {
								throw Error(response.statusText);
							}
							// Read the response as json.
							return response.json();
						})
						.then(function(responseAsJson) {
							// Do stuff with the JSON
							return setStore({ similarGamesList: responseAsJson.results });
						})
						.catch(function(error) {
							console.log("Looks like there was a problem: \n", error);
						});
				} else {
					fetch(`https://api.rawg.io/api/games?genres=${genreId[0]}`)
						.then(function(response) {
							if (!response.ok) {
								throw Error(response.statusText);
							}
							// Read the response as json.
							return response.json();
						})
						.then(function(responseAsJson) {
							// Do stuff with the JSON
							return setStore({ similarGamesList: responseAsJson.results });
						})
						.catch(function(error) {
							console.log("Looks like there was a problem: \n", error);
						});
				}
			},
			loadAddedByPlayers: addedList => {
				let playerlist = [];
				for (let value in addedList) {
					playerlist.push(`${value} : ${addedList[value]}`);
				}
				return setStore({ addedByPlayers: playerlist });
			},
			loadLists: pageNumber => {
				fetch(`https://api.rawg.io/api/games?ordering=-metacritic&page=${pageNumber}`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ gameMetacriticList: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
				fetch(`https://api.rawg.io/api/games?ordering=-rating&page=${pageNumber}`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ gameRatingList: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadSearch: gameName => {
				fetch(`https://api.rawg.io/api/games?search=${gameName}&page_size=6`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ searchBar: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadSuperSearch: (gameName, pagination, genres, tags, sort, platforms) => {
				let get = `https://api.rawg.io/api/games`;
				if (gameName != "" && get[29] != "?") {
					get += `?search=${gameName}`;
				} else if (gameName != "") {
					get += `&search=${gameName}`;
				}
				if (pagination != null && get[29] != "?") {
					get += `?page=${pagination}`;
				} else if (pagination != null) {
					get += `&page=${pagination}`;
				}
				if (genres != null && get[29] != "?") {
					get += `?genres=${genres}`;
				} else if (genres != null) {
					get += `&genres=${genres}`;
				}
				if (tags != null && get[29] != "?") {
					get += `?tags=${tags}`;
				} else if (tags != null) {
					get += `&tags=${tags}`;
				}
				if (sort != null && get[29] != "?") {
					get += `?ordering=${sort}`;
				} else if (sort != null) {
					get += `&ordering=${sort}`;
				}
				if (platforms != null && get[29] != "?") {
					get += `?platforms=${platforms}`;
				} else if (platforms != null) {
					get += `&platforms=${platforms}`;
				}
				fetch(get)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ superSearch: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadGameAchievements: gameId => {
				fetch(`https://api.rawg.io/api/games/${gameId}/achievements`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ gameAchievements: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadGameTrailers: gameId => {
				fetch(`https://api.rawg.io/api/games/${gameId}/movies`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ gameTrailers: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadTags: pageSize => {
				fetch(`https://api.rawg.io/api/tags?page_size=${pageSize}`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ tags: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadGenres: pageSize => {
				fetch(`https://api.rawg.io/api/genres?page_size=${pageSize}`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ genres: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadPlatforms: pageSize => {
				fetch(`https://api.rawg.io/api/platforms?page_size=${pageSize}`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ platforms: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			changePreference: () => {
				const store = getStore();

				if (store.user.preference == true) {
					let newUser = { ...store.user, preference: false };
					setStore({ user: newUser });
				} else {
					let newUser = { ...store.user, preference: true };
					setStore({ user: newUser });
				}
			}
		}
	};
};

export default getState;
