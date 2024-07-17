package models

type Furniture struct {
	ID          int    `json:"id,omitempty" bson:"id,omitempty"`
	Name        string `json:"name" bson:"name,omitempty"`
	Description string `json:"description" bson:"description,omitempty"`
	Type        string `json:"type" bson:"type,omitempty"`
	Collection  string `json:"collection" bson:"collection,omitempty"`
	Quality     int    `json:"quality" bson:"quality,omitempty"`
	Price       int    `json:"price" bson:"price,omitempty"`
	Skin        string `json:"skin" bson:"skin,omitempty"`
}
