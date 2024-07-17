package models

type Flat struct {
	ID        string     `json:"id" bson:"id"`
	House     int        `json:"house" bson:"house,omitempty"`
	District  int        `json:"district" bson:"district,omitempty"`
	Back      string     `json:"back" bson:"back"`
	Chair     *Furniture `json:"chair" bson:"chair,omitempty"`
	Table     *Furniture `json:"table" bson:"table,omitempty"`
	Locker    *Furniture `json:"locker" bson:"locker,omitempty"`
	TV        *Furniture `json:"tv" bson:"tv,omitempty"`
	Lamp      *Furniture `json:"lamp" bson:"lamp,omitempty"`
	Price     int        `json:"price" bson:"price,omitempty"`
	OnePrice  int        `json:"oneprice" bson:"oneprice,omitempty"`
	Men       []Man      `json:"men" bson:"men,omitempty"`
	Time      string     `json:"time" bson:"time"`
	StartTime string     `json:"starttime" bson:"starttime"`
	Auction   bool       `json:"auction" bson:"auction"`
}
