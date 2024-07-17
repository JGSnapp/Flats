package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Collection struct {
	ID   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name string             `json:"name" bson:"name,omitempty"`
	Tir  int                `json:"tir" bson:"tir,omitempty"`
}
