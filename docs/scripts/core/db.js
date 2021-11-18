(function () {

    const STORAGE_KEY = "draft";
    const DATA_TEMPLATE_URL = 'https://cdn.jsdelivr.net/gh/learnpoint/mockdb/db.json';

    const prototype = {
        ready: 'db.ready',
        save: save
    }

    // Export
    const db = window.db = Object.create(prototype);

    document.addEventListener('DOMContentLoaded', async () => {
        const loadDatabaseStart = Date.now();
        await load();
        decorate();
        console.log('Load database:', Date.now() - loadDatabaseStart, 'ms')
        document.dispatchEvent(new Event(db.ready));
    });

    async function load() {
        let _db = JSON.parse(sessionStorage.getItem(STORAGE_KEY));

        if (_db) {
            Object.assign(db, _db);
        } else {
            const res = await fetch(DATA_TEMPLATE_URL);
            _db = await res.json();
            Object.assign(db, _db);
            save();
        }
    }

    function save() {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    }

    function decorate() {
        const foreignKeys = Object.keys(db).map(key => key.slice(0, -1) + '_id');
        const collectionNameFromForeignKey = foreignKey => foreignKey.slice(0, -3) + 's';
        const entityNameFromCollectionName = collectionName => collectionName.slice(0, -1);

        // Belongs-To Decoration
        for (const [collectionKey, collection] of Object.entries(db)) {
            collection.forEach(entity => {
                const entityForeignKeys = Object.keys(entity).filter(key => foreignKeys.includes(key));
                entityForeignKeys.forEach(entityForeignKey => {
                    const foreignCollectionName = collectionNameFromForeignKey(entityForeignKey);
                    const foreignEntityName = entityNameFromCollectionName(foreignCollectionName);
                    Object.defineProperty(entity, foreignEntityName, {
                        get() {
                            return db[foreignCollectionName].find(e => e.id === entity[entityForeignKey]);
                        }
                    });
                });
            });
        }

        // Has-Many Decoration
        for (const [collectionKey, collection] of Object.entries(db)) {
            const entity = collection[0];
            const entityForeignKeys = Object.keys(entity).filter(key => foreignKeys.includes(key));
            entityForeignKeys.forEach(entityForeignKey => {
                const foreignCollectionName = collectionNameFromForeignKey(entityForeignKey);
                db[foreignCollectionName].forEach(foreignEntity => {
                    Object.defineProperty(foreignEntity, collectionKey, {
                        get() {
                            return db[collectionKey].filter(e => e[entityForeignKey] === foreignEntity.id);
                        }
                    });
                });
            });
        }
    }

    Array.prototype.where = function (predicate) {
        if (typeof predicate === 'string') {
            eval(`predicate = ${predicate}`);
        }

        return this.filter(item => {
            for (const key in predicate) {
                if (item[key] != predicate[key]) {
                    return false;
                }
            }
            return true;
        });
    };

})();
