export async function getLocalFile(path){

	let result = [];
	await fetch(path)
		.then(response => response.json())
		.then(jsonResponse =>{ result = jsonResponse;});

	return result;
    
}