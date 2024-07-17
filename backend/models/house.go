package models

type House struct {
	ID       int    `json:"id,omitempty" bson:"id,omitempty"`
	Name     string `json:"name" bson:"name,omitempty"`
	Tir      int    `json:"tir" bson:"tir,omitempty"`
	Image    string `json:"image" bson:"image,omitempty"`
	AllFlats int    `json:"allflats" bson:"allflats,omitempty"`
	CurFlats int    `json:"curflats" bson:"curflats,omitempty"`
	Price    int    `json:"price" bson:"price,omitempty"`
}
