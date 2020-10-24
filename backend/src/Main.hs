module Main where

import Network.EngineIO.Snap (snapAPI)
import Snap.Core as Snap
import Snap.Http.Server as Snap
import Snap.Http.Server.Config ()
import Network.SocketIO as SocketIO
import Control.Monad.IO.Class (liftIO)

main :: IO ()
main = do
  handler <- SocketIO.initialize snapAPI mkRoutes
  Snap.httpServe config $ Snap.route
    [ ("/socket.io", handler)
    ]
  where
    config = mconcat
      [ setPort 8082
      ]
      defaultConfig

    mkRoutes = do
      liftIO $ putStrLn "routes"
      broadcast "updateUsers" ["hello", "world" :: String]

      on "setUsername" $ \userName -> do
        liftIO $ putStrLn userName
