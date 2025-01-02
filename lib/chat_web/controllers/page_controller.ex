defmodule ChatWeb.PageController do
  use ChatWeb, :controller
alias Chat.Chats
  def index(conn, _params) do
    messages = Chats.list_messages
    render(conn, :index, messages: messages)
  end

  def room(conn, _params) do
    render(conn, "room.html", layout: false)
  end

  def create_room(conn, _params) do
    # Generate a unique room code
    room_code = :crypto.strong_rand_bytes(5) |> Base.url_encode64() |> binary_part(0, 6)

    # Send the code as a JSON response
    json(conn, %{room_code: room_code})
  end

  def join_room(conn, %{"code" => code}) do
    # Logic for handling the room code can go here
    # For now, just render the room page or redirect
    IO.puts("User joined room with code: #{code}")

    # Render a room page or redirect
    render(conn, "room.html", room_code: code,layout: false)
  end


end
