package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewNetworkEntityFunc func(client *CitybikesSDK, entopts map[string]any) CitybikesEntity

