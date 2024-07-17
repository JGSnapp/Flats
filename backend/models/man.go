package models

type Man struct {
	ID          int    `json:"id,omitempty" bson:"id,omitempty"`
	Chance      int    `json:"proc" bson:"proc,omitempty"`
	Skin        string `json:"skin" bson:"skin,omitempty"`
	Type        string `json:"type" bson:"type,omitempty"`
	Description string `json:"description" bson:"description,omitempty"`
}
