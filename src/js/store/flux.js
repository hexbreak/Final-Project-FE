import { UserTags } from "../component/userTags";

const getState = ({ getStore, getActions, setStore }) => {
	const beURL = "https://3000-bronze-earwig-hbuagomx.ws-us03.gitpod.io"; // Use ${beURL} to make it easier when handling the BE's constant URL changes
	const apiKey = "33af10ad5812440abf75a35c04492e15";
	return {
		store: {
			token: null,
			user: {
				// change to null after pitch day for code clean up
				username: "",
				password: "",
				email: "",
				id: 1,
				about: "",
				image: "",
				platforms: [null, null, null],
				game_progression: [null, null, null, null, null, null, null, null, null],
				playing: [null, null, null],
				liked: [],
				disliked: [],
				preference: false,
				favorites: []
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
			found: [],
			check: [],
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
			logout: () => {
				setStore({ token: null });
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			// User Registration // incomplete code until JWT integration
			registerUser: user => {
				fetch(`${beURL}/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: username,
						email: email,
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
					.catch(error => console.error("Error:", error));
			},
			// Login & generate token
			loginUser: (password, username) => {
				const actions = getActions();
				const store = getStore();
				fetch(`${beURL}/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: username,
						password: password
					})
				})
					.then(response => response.json())
					.then(data => {
						if (typeof data.msg != "undefined") {
							// Notify.error(token.msg)
						} else {
							setStore({ token: data.token, user: { ...getStore().user, id: data.user_id } });
							actions.getUserProfile(store.user.id);
						}
					});
			},
			addtoFavorites: () => {
				const store = getStore();
				fetch(`${beURL}/user/${store.user.id}/fav`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						game_id: store.game.id,
						game_name: store.game.name,
						game_image: store.game.background_image
					})
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(responseAsJson => {
						console.log("Success:", responseAsJson);
						let newUser = { ...user, favorites: responseAsJson };
						return setStore({ user: newUser });
					})
					.catch(error => console.error("Error:", error));
				// GET favorite
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
				fetch(`https://api.rawg.io/api/games?key=${apiKey}&page=${pageNumber}`)
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
				fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
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
				fetch(`https://api.rawg.io/api/games?key=${apiKey}&ordering=${ordering}&page=${pageNumber}&page_size=8`)
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
				fetch(`https://api.rawg.io/api/games/${gameId}/additions?key=${apiKey}`)
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
				fetch(`https://api.rawg.io/api/games/${gameId}/game-series?key=${apiKey}`)
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
					fetch(`https://api.rawg.io/api/games?key=${apiKey}&genres=${genreId[1]}`)
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
					fetch(`https://api.rawg.io/api/games?key=${apiKey}&genres=${genreId[0]}`)
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
				fetch(
					`https://api.rawg.io/api/games??key=${apiKey}&ordering=-metacritic&page=${pageNumber}&page_size=8`
				)
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
				fetch(`https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&page=${pageNumber}&page_size=8`)
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
				fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${gameName}&page_size=6`)
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
				let get = `https://api.rawg.io/api/games?key=${apiKey}&page_size=20`;
				let filters = {
					search: gameName,
					page: pagination,
					genres: genres,
					tags: tags,
					ordering: sort,
					platforms: platforms
				};
				for (let filter in filters) {
					if (!!filters[filter]) {
						get += `&${filter}=${filters[filter]}`;
					}
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
				fetch(`https://api.rawg.io/api/games/${gameId}/achievements?key=${apiKey}`)
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
				fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`)
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
				fetch(`https://api.rawg.io/api/tags?key=${apiKey}&page_size=${pageSize}`)
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
				fetch(`https://api.rawg.io/api/genres?key=${apiKey}&page_size=${pageSize}`)
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
				fetch(`https://api.rawg.io/api/platforms?key=${apiKey}&page_size=${pageSize}`)
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
			},
			looking: gameName => {
				fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${gameName}&page_size=6`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ found: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			handleSave: user => {
				const actions = getActions();
				const store = getStore();
				fetch(`${beURL}/user/${store.user.id}`, {
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
						// Here we work with JSON
						actions.getUserProfile(store.user.id);
						return setStore({ user: user });
					});
				// setStore({ user: user }); // OLD setStore
				// setStore({ user: { 0: user } }); // NEW setStore
			},
			getUserProfile: user => {
				const store = getStore();
				fetch(`${beURL}/user/${store.user.id}`, {
					method: "GET"
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(
						data =>
							setStore({ user: { ...getStore().user, ...data } }) ||
							console.log("data front, get userprofile", data)
					)
					.catch(error => console.log(error));
			},
			handlePicture: image => {
				const store = getStore();
				let newUser = store.user;
				newUser = { ...user, image: image };
				setStore({ user: newUser });
			},
			getFavorites: userId => {
				fetch(`${beURL}/user/${userId}/fav`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						let newUser = { ...user, favorites: responseAsJson };
						return setStore({ user: newUser });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			checkFavorites: gameId => {
				const store = getStore();
				let check = store.user.favorites.filter(value => gameId == value.game_id);
				if (check.length > 0) {
					setStore({ check: true });
				} else {
					setStore({ check: false });
				}
			},
			deleteFromFavorites: gameId => {
				const store = getStore();
				let game = store.user.favorite.filter(value => gameId == value.game_id);
				fetch(`${beURL}/user/${store.user.id}/delfav/` + game[0].id, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(responseAsJson => {
						console.log("Success:", responseAsJson);
						fetch(`${beURL}/user/${store.user.id}/fav`, {
							method: "GET",
							headers: {
								"Content-Type": "application/json"
							}
						})
							.then(response => {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								return response.json();
							})
							.then(responseAsJson => {
								let newUser = { ...user, favorites: responseAsJson };
								return setStore({ user: newUser });
							})
							.catch(error => console.error("Error:", error));
					})
					.catch(error => console.error("Error:", error));
			}
		}
	};
};

export default getState;
