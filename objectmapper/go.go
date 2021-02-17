package main

import (
        "encoding/json"
        "fmt"
        "io/ioutil"
        "os"

        "github.com/tidwall/gjson"

)

func main() {

	file, err := ioutil.ReadFile("./nested.json")
	if err != nil {
		fmt.Printf("File error: %v\n", err)
		os.Exit(1)
	}
	myJSON := string(file)
	m, ok := gjson.Parse(myJSON).Value().(map[string]interface{})
	if !ok {
		fmt.Println("Error")
		os.Exit(1)
	}

	jsonBytes, err := json.Marshal(m)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(jsonBytes),"\n\n")
}