import Cookies, { get } from "js-cookie";
const getState = ({ getStore, getActions, setStore }) => {
	const beURL = "https://gamefinder99.herokuapp.com/"; // Use ${beURL} to make it easier when handling the BE's constant URL changes
	const apiKey = "33af10ad5812440abf75a35c04492e15";
	return {
		store: {
			token: "",
			id: null,
			username: "",
			password: "",
			email: "",
			user_platforms: [],
			tags_liked: [],
			tags_disliked: [],
			genres_liked: [],
			genres_disliked: [],
			user_games: [],
			preference: false,
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
			tags: [],
			genres: [],
			platforms: [],
			addedByPlayers: [],
			searchBar: [],
			superSearch: [],
			found: [],
			check: [],
			errors: { loginError: false, registerError: false }
		},
		actions: {
			// new user registration
			registerUser: async (username, email, password, history) => {
				if (username != "" && email != "" && password != "") {
					await fetch(`${beURL}/register`, {
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
							setStore;
							return response.json();
						})
						.then(response => {
							history.push("/login");
							setStore({ errors: { registerError: false } });
						})
						.catch(error => console.error("Error:", error));
				} else {
					setStore({ errors: { registerError: true } });
				}
			},
			// login & generate token
			loginUser: async (password, username, history) => {
				const actions = getActions();
				const store = getStore();
				if (password != "" && username != "") {
					await fetch(`${beURL}/login`, {
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
							if (data.token != undefined) {
								setStore({ token: data.token });
								Cookies.set("access", data.token);
								actions.getUserProfile(store.id);
								history.push("/home");
								setStore({ errors: { loginError: false } });
							} else {
								setStore({ errors: { loginError: true } });
							}
						});
				} else {
					setStore({ errors: { loginError: true } });
				}
			},
			syncToken: () => {
				const actions = getActions();
				let token = Cookies.get("access");
				if (token && token != undefined && token != "") {
					setStore({ token: token });
					actions.getUserProfile();
				}
			},
			// logout from account
			logout: history => {
				setStore({ token: "", id: 0, preference: false });
				Cookies.remove("access");
				history.push("/home");
			},
			addtoUserGames: async () => {
				const store = getStore();
				await fetch(`${beURL}/user/${store.id}/backlog`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						game_id: store.game.id,
						game_name: store.game.name,
						game_image: store.game.background_image,
						game_status: "all"
					})
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(responseAsJson => {
						fetch(`${beURL}/user/${store.id}/backlog`)
							.then(function(response) {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								// Read the response as json.
								return response.json();
							})
							.then(function(responseAsJson) {
								// Do stuff with the JSON
								return setStore({ user_games: responseAsJson });
							})
							.catch(function(error) {
								console.log("Looks like there was a problem: \n", error);
							});
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
			loadGameList: async pageNumber => {
				await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page=${pageNumber}`)
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
			loadGame: async gameId => {
				await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
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
			loadSortedGameList: async (pageNumber, ordering) => {
				await fetch(
					`https://api.rawg.io/api/games?key=${apiKey}&ordering=${ordering}&page=${pageNumber}&page_size=8`
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
						return setStore({ sortedGameList: responseAsJson.results });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadDlcs: async gameId => {
				await fetch(`https://api.rawg.io/api/games/${gameId}/additions?key=${apiKey}`)
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
				fetch(`https://api.rawg.io/api/games?key=${apiKey}&ordering=-metacritic&page=${pageNumber}&page_size=8`)
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
				if (store.preference == true) {
					setStore({ preference: false });
				} else {
					setStore({ preference: true });
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
				fetch(`${beURL}/user/${store.id}`, {
					method: "PUT",
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
						actions.getUserProfile(store.id);
						return setStore({ user: user });
					});
			},
			getUserProfile: async () => {
				const store = getStore();
				const options = {
					method: "GET",
					headers: {
						Authorization: `Bearer ${store.token}`
					}
				};
				const response = await fetch(`${beURL}/protected`, options);
				const result = await response.json();
				setStore({ id: result.user_id });
				fetch(`${beURL}/user/${store.id}`, {
					method: "GET"
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						console.log(response.json);
						return response.json();
					})
					.then(data => setStore({ ...data }) || console.log("data front, get userprofile", data))
					.catch(error => console.log(error));
			},
			handlePicture: image => {
				const store = getStore();
				return setStore({ image: image });
			},
			getUserGames: userId => {
				const store = getStore();
				fetch(`${beURL}/user/${userId}/backlog`)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						return setStore({ user_games: responseAsJson });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			checkUserGames: gameId => {
				const store = getStore();
				let check = store.user_games.filter(value => gameId == value.game_id);
				setStore({ check: check });
			},
			editUserGames: async (gameId, game_status) => {
				const store = getStore();
				let check = store.user_games.filter(value => gameId == value.game_id);
				check = store.check[0].id;
				await fetch(`${beURL}/user/${store.id}/updatebl/${check}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ game_status: game_status })
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(responseAsJson => {
						fetch(`${beURL}/user/${store.id}/backlog`)
							.then(function(response) {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								// Read the response as json.
								return response.json();
							})
							.then(function(responseAsJson) {
								// Do stuff with the JSON
								return setStore({ user_games: responseAsJson });
							})
							.catch(function(error) {
								console.log("Looks like there was a problem: \n", error);
							});
					})
					.catch(error => console.error("Error:", error));
			},
			deleteFromUserGames: gameId => {
				const store = getStore();
				let game = store.user_games.filter(value => gameId == value.game_id);
				fetch(`${beURL}/user/${store.id}/removebl/` + game[0].id, {
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
						fetch(`${beURL}/user/${store.id}/backlog`)
							.then(function(response) {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								// Read the response as json.
								return response.json();
							})
							.then(function(responseAsJson) {
								// Do stuff with the JSON
								return setStore({ user_games: responseAsJson });
							})
							.catch(function(error) {
								console.log("Looks like there was a problem: \n", error);
							});
					})
					.catch(error => console.error("Error:", error));
			},
			handlePreference: async (type, movement, value, make, type2) => {
				let store = getStore();
				let actions = getActions();
				if (type == "platform") {
					if (movement == "add") {
						await fetch(`${beURL}/user/${store.id}/platforms`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								platform_name: value.name,
								platform_id: value.id
							})
						})
							.then(response => {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								response.json();
							})
							.then(response => {
								actions.getPreference(type).then(() => {
									return make();
								});
							})
							.catch(error => console.error("Error:", error));
					}
					if (movement == "delete") {
						await fetch(`${beURL}/user/${store.id}/platforms/${value.id}`, {
							method: "DELETE",
							headers: {
								"Content-Type": "application/json"
							}
						})
							.then(response => {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								response.json();
							})
							.then(response => {
								actions.getPreference(type).then(() => {
									return make();
								});
							})
							.catch(error => console.error("Error:", error));
					}
				}
				if (type == "genre") {
					if (movement == "add") {
						if (type2 == "liked") {
							await fetch(`${beURL}/user/${store.id}/genrelikes`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({
									genre_name: value.name,
									genre_id: value.id
								})
							})
								.then(response => {
									if (!response.ok) {
										throw Error(response.statusText);
									}
									return response.json();
								})
								.then(response => {
									actions.getPreference(type, type2).then(() => {
										return make();
									});
								})
								.catch(error => console.error("Error:", error));
						}
						if (type2 == "disliked") {
							await fetch(`${beURL}/user/${store.id}/genredislikes`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({
									genre_name: value.name,
									genre_id: value.id
								})
							})
								.then(response => {
									if (!response.ok) {
										throw Error(response.statusText);
									}
									return response.json();
								})
								.then(response => {
									actions.getPreference(type, type2).then(() => {
										return make();
									});
								})
								.catch(error => console.error("Error:", error));
						}
					}
					if (movement == "delete") {
						if (type2 == "liked") {
							await fetch(`${beURL}/user/${store.id}/genrelikes/${value.id}`, {
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
								.then(response => {
									actions.getPreference(type, type2).then(() => {
										return make();
									});
								})
								.catch(error => console.error("Error:", error));
						}
						if (type2 == "disliked") {
							await fetch(`${beURL}/user/${store.id}/degd/${value.id}`, {
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
								.then(response => {
									actions.getPreference(type, type2).then(() => {
										return make();
									});
								})
								.catch(error => console.error("Error:", error));
						}
					}
				}
				if (type == "tag") {
					if (movement == "add") {
						if (type2 == "liked") {
							await fetch(`${beURL}/user/${store.id}/taglike`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({
									tag_name: value.name,
									tag_id: value.id
								})
							})
								.then(response => {
									if (!response.ok) {
										throw Error(response.statusText);
									}
									return response.json();
								})
								.then(response => {
									actions.getPreference(type, type2).then(() => {
										return make();
									});
								})
								.catch(error => console.error("Error:", error));
						}
						if (type2 == "disliked") {
							await fetch(`${beURL}/user/${store.id}/tagdislike`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({
									tag_name: value.name,
									tag_id: value.id
								})
							})
								.then(response => {
									if (!response.ok) {
										throw Error(response.statusText);
									}
									return response.json();
								})
								.then(response => {
									actions.getPreference(type, type2).then(() => {
										return make();
									});
								})
								.catch(error => console.error("Error:", error));
						}
					}
					if (movement == "delete") {
						if (type2 == "liked") {
							await fetch(`${beURL}/user/${store.id}/platforms/${value.id}`, {
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
								.then(response => {
									actions.getPreference(type, type2).then(() => {
										return make();
									});
								})
								.catch(error => console.error("Error:", error));
						}
						if (type2 == "disliked") {
							await fetch(`${beURL}/user/${store.id}/detd/${value.id}`, {
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
								.then(response => {
									actions.getPreference(type, type2).then(() => {
										return make();
									});
								})
								.catch(error => console.error("Error:", error));
						}
					}
				}
			},
			getPreference: async (type, type2) => {
				const store = getStore();
				console.log(type, type2);
				if (type == "platform") {
					await fetch(`${beURL}/user/${store.id}/platforms`)
						.then(function(response) {
							if (!response.ok) {
								throw Error(response.statusText);
							}
							// Read the response as json.
							return response.json();
						})
						.then(function(responseAsJson) {
							// Do stuff with the JSON
							return setStore({ user_platforms: responseAsJson });
						})
						.catch(function(error) {
							console.log("Looks like there was a problem: \n", error);
						});
				}
				if (type == "genre") {
					if (type2 == "liked") {
						await fetch(`${beURL}/user/${store.id}/genrelikes`)
							.then(function(response) {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								// Read the response as json.
								return response.json();
							})
							.then(function(responseAsJson) {
								// Do stuff with the JSON
								return setStore({ genres_liked: responseAsJson });
							})
							.catch(function(error) {
								console.log("Looks like there was a problem: \n", error);
							});
					}
					if (type2 == "disliked") {
						await fetch(`${beURL}/user/${store.id}/genredislikes`)
							.then(function(response) {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								// Read the response as json.
								return response.json();
							})
							.then(function(responseAsJson) {
								// Do stuff with the JSON
								return setStore({ genres_disliked: responseAsJson });
							})
							.catch(function(error) {
								console.log("Looks like there was a problem: \n", error);
							});
					}
				}
				if (type == "tag") {
					if (type2 == "liked") {
						await fetch(`${beURL}/user/${store.id}/taglike`)
							.then(function(response) {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								// Read the response as json.
								return response.json();
							})
							.then(function(responseAsJson) {
								// Do stuff with the JSON
								return setStore({ tags_liked: responseAsJson });
							})
							.catch(function(error) {
								console.log("Looks like there was a problem: \n", error);
							});
					}
					if (type2 == "disliked") {
						await fetch(`${beURL}/user/${store.id}/tagdislike`)
							.then(function(response) {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								// Read the response as json.
								return response.json();
							})
							.then(function(responseAsJson) {
								// Do stuff with the JSON
								return setStore({ tags_disliked: responseAsJson });
							})
							.catch(function(error) {
								console.log("Looks like there was a problem: \n", error);
							});
					}
				}
			}
		}
	};
};

export default getState;
