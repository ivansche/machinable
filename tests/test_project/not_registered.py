from machinable import Component


class NotRegisteredComponent(Component):
    def on_create(self):
        print(self.config)
