const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			addFavorite: newItem => {
				var storeCopy = getStore();
				var checkItem = storeCopy.favorites.find(value => {
					return value == newItem;
				});
				if (checkItem == undefined) {
					var newFavorites = storeCopy.favorites.concat(newItem);
					setStore({ favorites: newFavorites });
				}
			},
			loadFavoriteData: () => {
				fetch("https://api.rawg.io/api/platforms?key=177fced3a65f46e4a1f84503a84675ad")
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON
						console.log(responseAsJson);
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
                */
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
			}
		}
	};
};

export default getState;
