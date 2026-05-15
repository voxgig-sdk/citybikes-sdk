# Citybikes SDK utility: make_context

from core.context import CitybikesContext


def make_context_util(ctxmap, basectx):
    return CitybikesContext(ctxmap, basectx)
