import { Container } from "aurelia-framework";
import { ICache } from "../services/cache/cache.service";
import { ISession } from "../services/session/session.service";
import { LocalStorageSession } from "../services/session/local-storage-session.service";
import { LocalStorageCache } from "../services/cache/local-storage-cache.service";
import { IStateManager } from "../services/state/state-manager.service";
import { TabStateManager } from "../services/state/tab-state-manager.service";

export function configureRootContainer(rootContainer: Container) {
  rootContainer.registerSingleton(ICache, LocalStorageCache);
  rootContainer.registerSingleton(ISession, LocalStorageSession);
  rootContainer.registerSingleton(IStateManager, TabStateManager);
}
