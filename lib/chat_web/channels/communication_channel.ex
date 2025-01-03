defmodule ChatWeb.CommunicationChannel do
  use ChatWeb, :channel
alias Chat.Chats
  def join("communication:lobby", _payload, socket) do
      {:ok, socket}
    end

  def handle_in("shout", payload, socket) do
    Chats.create_message(payload)
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

end
