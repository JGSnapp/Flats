package models

type User struct {
	ID           string      `json:"id,omitempty" bson:"id,omitempty"`
	Money        int         `json:"money" bson:"money,omitempty"`
	Furniture    []Furniture `json:"furniture" bson:"furniture,omitempty"`
	Men          []Man       `json:"men" bson:"men,omitempty"`
	Flats        []string    `json:"flats" bson:"flats,omitempty"`
	Channels     []string    `json:"channels" bson:"channels,omitempty"`
	RefID        string      `json:"refid,omitempty" bson:"refid,omitempty"`
	RefCount     int         `json:"refcount" bson:"refcount,omitempty"`
	RefLastCheck int         `json:"reflastcheck" bson:"reflastcheck,omitempty"`
	Time         string      `json:"time" bson:"time"`
	Challenge    []bool      `json:"chal" bson:"chal"`
	ManBound     []string    `json:"manbound" bson:"manbound"`
}
