package models

type District struct {
	ID     int     `json:"id,omitempty" bson:"id,omitempty"`
	Name   string  `json:"name" bson:"name,omitempty"`
	Tir    int     `json:"tir" bson:"tir,omitempty"`
	Houses []House `json:"houses" bson:"houses,omitempty"`
}
