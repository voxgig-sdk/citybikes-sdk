package core

type CitybikesError struct {
	IsCitybikesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCitybikesError(code string, msg string, ctx *Context) *CitybikesError {
	return &CitybikesError{
		IsCitybikesError: true,
		Sdk:              "Citybikes",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CitybikesError) Error() string {
	return e.Msg
}
