import os

from starlette.applications import Starlette
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from ariadne import load_schema_from_path, make_executable_schema
from ariadne.asgi import GraphQL

from .filesystem import observation_resolver
from .graphql import scalar_types, query, mutation, subscription

dir_path = os.path.dirname(os.path.realpath(__file__))
schema = make_executable_schema(
    load_schema_from_path(os.path.join(dir_path, "graphql/schema/")),
    [*scalar_types, query, mutation, subscription],
)


graphql = GraphQL(schema, keepalive=True)

routes = [
    Route(
        "/filesystem/observation/{url:path}/{filename:path}",
        endpoint=observation_resolver,
    )
]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )
]

server = Starlette(routes=routes, middleware=middleware)
server.mount("/", graphql)
